package main

import (
	"bufio"
	"bytes"
	"crypto/tls"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"regexp"
	"strconv"
	"strings"
	"time"
)

const (
	OpenSearchHost = "https://172.24.32.131:9200"
	IndexName      = "powerplant_scada"
	Username       = "admin"

	LogFile   = `C:\Users\cdot\Downloads\receiver\logs.txt`
	StateFile = `C:\Users\cdot\Desktop\test_pipeline\.powerplant_offset`
)

type PowerPlantEvent struct {
	Timestamp          string  `json:"timestamp"`
	LogType            string  `json:"log_type"`
	PlantID            string  `json:"plant_id"`
	UnitID             string  `json:"unit_id"`
	TurbineRPM         int     `json:"turbine_rpm"`
	BoilerTemperature  float64 `json:"boiler_temperature_c"`
	SteamPressureMPa   float64 `json:"steam_pressure_mpa"`
	GeneratorVoltageKV float64 `json:"generator_voltage_kv"`
	PowerOutputMW      float64 `json:"power_output_mw"`
	VibrationLevel     float64 `json:"vibration_level"`
	CoolingPumpStatus  string  `json:"cooling_pump_status"`
	FuelFlowRate       float64 `json:"fuel_flow_rate"`
	EmergencyShutdown  bool    `json:"emergency_shutdown"`
	Alarm              string  `json:"alarm"`
}

var (
	password string

	httpClient = &http.Client{
		Timeout: 30 * time.Second,
		Transport: &http.Transport{
			TLSClientConfig: &tls.Config{
				InsecureSkipVerify: true,
			},
		},
	}

	keyValueRegex = regexp.MustCompile(`(\w+)=([^\s]+)`)
)

func loadOffset() int64 {

	data, err := os.ReadFile(StateFile)

	if err != nil {
		return 0
	}

	offset, err := strconv.ParseInt(
		strings.TrimSpace(string(data)),
		10,
		64,
	)

	if err != nil {
		return 0
	}

	return offset
}

func saveOffset(offset int64) {

	err := os.WriteFile(
		StateFile,
		[]byte(strconv.FormatInt(offset, 10)),
		0644,
	)

	if err != nil {
		log.Printf(
			"Failed to save offset: %v",
			err,
		)
	}
}

func parseLogLine(line string) (*PowerPlantEvent, error) {

	if strings.Contains(line, "]:") {
		parts := strings.SplitN(line, "]:", 2)
		line = strings.TrimSpace(parts[1])
	}

	matches := keyValueRegex.FindAllStringSubmatch(
		line,
		-1,
	)

	values := make(map[string]string)

	for _, match := range matches {

		if len(match) == 3 {
			values[match[1]] = match[2]
		}
	}

	requiredFields := []string{
		"timestamp",
		"log_type",
		"plant_id",
		"unit_id",
		"turbine_rpm",
		"boiler_temperature_c",
		"steam_pressure_mpa",
		"generator_voltage_kv",
		"power_output_mw",
		"vibration_level",
		"cooling_pump_status",
		"fuel_flow_rate",
		"emergency_shutdown",
		"alarm",
	}

	for _, field := range requiredFields {

		if _, exists := values[field]; !exists {
			return nil,
				fmt.Errorf(
					"missing field: %s",
					field,
				)
		}
	}

	rpm, _ := strconv.Atoi(
		values["turbine_rpm"],
	)

	temp, _ := strconv.ParseFloat(
		values["boiler_temperature_c"],
		64,
	)

	pressure, _ := strconv.ParseFloat(
		values["steam_pressure_mpa"],
		64,
	)

	voltage, _ := strconv.ParseFloat(
		values["generator_voltage_kv"],
		64,
	)

	power, _ := strconv.ParseFloat(
		values["power_output_mw"],
		64,
	)

	vibration, _ := strconv.ParseFloat(
		values["vibration_level"],
		64,
	)

	fuelFlow, _ := strconv.ParseFloat(
		values["fuel_flow_rate"],
		64,
	)

	event := &PowerPlantEvent{
		Timestamp:          values["timestamp"],
		LogType:            values["log_type"],
		PlantID:            values["plant_id"],
		UnitID:             values["unit_id"],
		TurbineRPM:         rpm,
		BoilerTemperature:  temp,
		SteamPressureMPa:   pressure,
		GeneratorVoltageKV: voltage,
		PowerOutputMW:      power,
		VibrationLevel:     vibration,
		CoolingPumpStatus:  values["cooling_pump_status"],
		FuelFlowRate:       fuelFlow,
		EmergencyShutdown: strings.EqualFold(
			values["emergency_shutdown"],
			"true",
		),
		Alarm: values["alarm"],
	}

	return event, nil
}

func sendBulk(events []PowerPlantEvent) error {

	if len(events) == 0 {
		return nil
	}

	var bulkBuffer bytes.Buffer

	for _, event := range events {

		docID := fmt.Sprintf(
			"%s_%s_%s",
			event.PlantID,
			event.UnitID,
			event.Timestamp,
		)

		meta := map[string]interface{}{
			"index": map[string]interface{}{
				"_index": IndexName,
				"_id":    docID,
			},
		}

		metaJSON, _ := json.Marshal(meta)

		eventJSON, _ := json.Marshal(event)

		bulkBuffer.Write(metaJSON)
		bulkBuffer.WriteByte('\n')

		bulkBuffer.Write(eventJSON)
		bulkBuffer.WriteByte('\n')
	}

	req, err := http.NewRequest(
		http.MethodPost,
		OpenSearchHost+"/_bulk",
		&bulkBuffer,
	)

	if err != nil {
		return err
	}

	req.SetBasicAuth(
		Username,
		password,
	)

	req.Header.Set(
		"Content-Type",
		"application/json",
	)

	resp, err := httpClient.Do(req)

	if err != nil {
		return err
	}

	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)

	if resp.StatusCode >= 300 {

		return fmt.Errorf(
			"OpenSearch error (%d): %s",
			resp.StatusCode,
			string(body),
		)
	}

	log.Printf(
		"%d records indexed successfully",
		len(events),
	)

	fmt.Printf(
		"%d records indexed successfully\n",
		len(events),
	)

	return nil
}

func processLogs() error {

	lastOffset := loadOffset()

	info, err := os.Stat(LogFile)

	if err != nil {
		return err
	}

	fileSize := info.Size()

	if lastOffset > fileSize {

		log.Println(
			"Log file reset detected. Resetting offset.",
		)

		lastOffset = 0
	}

	file, err := os.Open(LogFile)

	if err != nil {
		return err
	}

	defer file.Close()

	_, err = file.Seek(
		lastOffset,
		io.SeekStart,
	)

	if err != nil {
		return err
	}

	reader := bufio.NewReader(file)

	if lastOffset != 0 {
		_, _ = reader.ReadString('\n')
	}

	var events []PowerPlantEvent

	for {

		line, err := reader.ReadString('\n')

		if err != nil {

			if err == io.EOF {
				break
			}

			return err
		}

		line = strings.TrimSpace(line)

		if line == "" {
			continue
		}

		event, err := parseLogLine(line)

		if err != nil {

			log.Printf(
				"Parse error: %v",
				err,
			)

			continue
		}

		events = append(
			events,
			*event,
		)
	}

	currentOffset, err := file.Seek(
		0,
		io.SeekCurrent,
	)

	if err == nil {
		saveOffset(currentOffset)
	}

	return sendBulk(events)
}

func main() {

	password = os.Getenv(
		"OPENSEARCH_PASSWORD",
	)

	if password == "" {

		log.Fatal(
			"OPENSEARCH_PASSWORD environment variable not set",
		)
	}

	log.Println(
		"Power Plant SCADA → OpenSearch Forwarder Started",
	)

	fmt.Println(
		"Power Plant SCADA → OpenSearch Forwarder Started",
	)

	for {

		err := processLogs()

		if err != nil {

			log.Printf(
				"Runtime error: %v",
				err,
			)

			fmt.Printf(
				"Runtime error: %v\n",
				err,
			)
		}

		time.Sleep(
			5 * time.Second,
		)
	}
}
