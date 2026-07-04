package main

import (
	"bufio"
	"encoding/csv"
	"fmt"
	"math/rand"
	"os"
	"strconv"
	"strings"
	"time"
)

type PowerPlantData struct {
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

type Thresholds struct {
	MaxBoilerTemp float64
	MaxPressure   float64
	MaxRPM        int
	MaxVibration  float64
	MaxPowerMW    float64
}

func randomRange(min, max float64) float64 {
	return min + rand.Float64()*(max-min)
}

func randomPumpStatus() string {
	statuses := []string{"RUNNING", "STANDBY", "OFF"}
	return statuses[rand.Intn(len(statuses))]
}

func askInt(reader *bufio.Reader, label string, defaultValue int) int {
	fmt.Printf("%s (default %d): ", label, defaultValue)
	input, _ := reader.ReadString('\n')
	input = strings.TrimSpace(input)
	if input == "" {
		return defaultValue
	}
	value, err := strconv.Atoi(input)
	if err != nil {
		fmt.Println("Invalid input. Using default.")
		return defaultValue
	}
	return value
}

func askFloat(reader *bufio.Reader, label string, defaultValue float64) float64 {
	fmt.Printf("%s (default %.2f): ", label, defaultValue)
	input, _ := reader.ReadString('\n')
	input = strings.TrimSpace(input)
	if input == "" {
		return defaultValue
	}
	value, err := strconv.ParseFloat(input, 64)
	if err != nil {
		fmt.Println("Invalid input. Using default.")
		return defaultValue
	}
	return value
}

func detectAlarm(temp float64, pressure float64, rpm int, vibration float64, power float64, thresholds Thresholds) (string, bool) {
	if temp > thresholds.MaxBoilerTemp {
		return "HIGH_BOILER_TEMP_ALERT", true
	}
	if pressure > thresholds.MaxPressure {
		return "HIGH_STEAM_PRESSURE_ALERT", true
	}
	if rpm > thresholds.MaxRPM {
		return "HIGH_TURBINE_RPM_ALERT", true
	}
	if vibration > thresholds.MaxVibration {
		return "HIGH_VIBRATION_ALERT", true
	}
	if power > thresholds.MaxPowerMW {
		return "POWER_OUTPUT_OVERLOAD_ALERT", true
	}
	return "NORMAL", false
}

func generateData(thresholds Thresholds) PowerPlantData {
	isAnomaly := rand.Float64() < 0.15

	var temp float64
	var pressure float64
	var rpm int
	var vibration float64
	var power float64

	if isAnomaly {
		temp = randomRange(thresholds.MaxBoilerTemp+10, thresholds.MaxBoilerTemp+80)
		pressure = randomRange(thresholds.MaxPressure+1, thresholds.MaxPressure+8)
		rpm = rand.Intn(2000) + thresholds.MaxRPM + 1
		vibration = randomRange(thresholds.MaxVibration+1, thresholds.MaxVibration+10)
		power = randomRange(thresholds.MaxPowerMW+50, thresholds.MaxPowerMW+300)
	} else {
		temp = randomRange(350, thresholds.MaxBoilerTemp-20)
		pressure = randomRange(8, thresholds.MaxPressure-1)
		rpm = rand.Intn(thresholds.MaxRPM - 1000)
		vibration = randomRange(0.1, thresholds.MaxVibration-1)
		power = randomRange(150, thresholds.MaxPowerMW-20)
	}

	alarm, emergency := detectAlarm(temp, pressure, rpm, vibration, power, thresholds)

	logType := "NORMAL"
	if emergency {
		logType = "ALERT"
	}

	return PowerPlantData{
		Timestamp:          time.Now().Format(time.RFC3339),
		LogType:            logType,
		PlantID:            "POWER-PLANT-01",
		UnitID:             "UNIT-A",
		TurbineRPM:         rpm,
		BoilerTemperature:  temp,
		SteamPressureMPa:   pressure,
		GeneratorVoltageKV: randomRange(11, 25),
		PowerOutputMW:      power,
		VibrationLevel:     vibration,
		CoolingPumpStatus:  randomPumpStatus(),
		FuelFlowRate:       randomRange(40, 200),
		EmergencyShutdown:  emergency,
		Alarm:              alarm,
	}
}

func main() {
	rand.Seed(time.Now().UnixNano())

	reader := bufio.NewReader(os.Stdin)

	fmt.Println("========================================")
	fmt.Println(" Power Plant SCADA Generator")
	fmt.Println("========================================")

	totalLogs := askInt(reader, "Enter total logs to generate", 100)

	fmt.Println("\n--- Configure Alert Thresholds ---")

	thresholds := Thresholds{
		MaxBoilerTemp: askFloat(reader, "Max Boiler Temperature (°C)", 600),
		MaxPressure:   askFloat(reader, "Max Steam Pressure (MPa)", 25),
		MaxRPM:        askInt(reader, "Max Turbine RPM", 5000),
		MaxVibration:  askFloat(reader, "Max Vibration Level", 10),
		MaxPowerMW:    askFloat(reader, "Max Power Output (MW)", 1000),
	}

	fileName := "powerplant_logs.csv"
	_, err := os.Stat(fileName)
	fileExists := !os.IsNotExist(err)

	outputFile, err := os.OpenFile(
		fileName,
		os.O_APPEND|os.O_CREATE|os.O_WRONLY,
		0644, 
	)
	if err != nil {
		panic(err)
	}
	defer outputFile.Close()

	writer := csv.NewWriter(outputFile)
	defer writer.Flush()

	if !fileExists {
		header := []string{
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
		err = writer.Write(header)
		if err != nil {
			panic(err)
		}
		fmt.Println("New file created: writing header...")
	} else {
		fmt.Println("Existing file found: appending logs without header...")
	}

	fmt.Println("\nGenerating Power Plant SCADA logs...\n")

	alertCount := 0
	normalCount := 0

	for i := 0; i < totalLogs; i++ {
		data := generateData(thresholds)

		record := []string{
			data.Timestamp,
			data.LogType,
			data.PlantID,
			data.UnitID,
			strconv.Itoa(data.TurbineRPM),
			fmt.Sprintf("%.2f", data.BoilerTemperature),
			fmt.Sprintf("%.2f", data.SteamPressureMPa),
			fmt.Sprintf("%.2f", data.GeneratorVoltageKV),
			fmt.Sprintf("%.2f", data.PowerOutputMW),
			fmt.Sprintf("%.2f", data.VibrationLevel),
			data.CoolingPumpStatus,
			fmt.Sprintf("%.2f", data.FuelFlowRate),
			strconv.FormatBool(data.EmergencyShutdown),
			data.Alarm,
		}

		err := writer.Write(record)
		if err != nil {
			panic(err)
		}

		if data.LogType == "ALERT" {
			alertCount++
		} else {
			normalCount++
		}

		fmt.Printf(
			"[%s] %-6s Temp=%.2f°C Pressure=%.2fMPa RPM=%d Power=%.2fMW Alarm=%s\n",
			data.Timestamp,
			data.LogType,
			data.BoilerTemperature,
			data.SteamPressureMPa,
			data.TurbineRPM,
			data.PowerOutputMW,
			data.Alarm,
		)

		time.Sleep(100 * time.Millisecond)
	}

	fmt.Println("\n========================================")
	fmt.Println(" Power Plant Generation Summary")
	fmt.Println("========================================")
	fmt.Printf("Total Logs   : %d\n", totalLogs)
	fmt.Printf("Normal Logs  : %d\n", normalCount)
	fmt.Printf("Alert Logs   : %d\n", alertCount)
	fmt.Println("Output File  : powerplant_logs.csv")
	fmt.Println("========================================")
}