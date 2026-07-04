package main

import (
	"bufio"
	"encoding/csv"
	"fmt"
	"io"
	"log"
	"net"
	"os"
	"strconv"
	"strings"
	"time"
)

const offsetFile = ".powerplant_offset"

func main() {

	reader := bufio.NewReader(os.Stdin)

	ip := prompt(reader, "Enter target IP: ")

	port := prompt(reader, "Enter target Port (e.g. 514): ")

	hostname := prompt(reader, "Enter hostname: ")

	app := prompt(reader, "Enter app name: ")

	facility := promptInt(
		reader,
		"Enter facility (default 1): ",
		1,
	)

	severity := promptInt(
		reader,
		"Enter severity (default 6): ",
		6,
	)

	interval := promptInt(
		reader,
		"Interval between logs (milliseconds, default 500): ",
		500,
	)

	pollInterval := promptInt(
		reader,
		"Poll interval for new rows (seconds, default 5): ",
		5,
	)

	csvFile := promptDefault(
		reader,
		"CSV file path (default powerplant_logs.csv): ",
		"powerplant_logs.csv",
	)

	address := fmt.Sprintf("%s:%s", ip, port)

	conn, err := net.Dial("tcp", address)
	if err != nil {
		log.Fatalf("Connection failed: %v", err)
	}
	defer conn.Close()

	fmt.Println("Connected to", address)

	header, err := readCSVHeader(csvFile)
	if err != nil {
		log.Fatalf(
			"Failed to read CSV header: %v",
			err,
		)
	}

	offset := loadOffset()

	fmt.Printf(
		"Starting from offset %d (rows already sent)\n",
		offset,
	)

	counter := offset

	for {

		records, err := readCSVData(csvFile)
		if err != nil {

			log.Printf(
				"Error reading CSV: %v",
				err,
			)

			time.Sleep(
				time.Duration(pollInterval) * time.Second,
			)

			continue
		}

		if offset >= len(records) {

			fmt.Printf(
				"\rWaiting for new rows... (sent %d/%d)    ",
				offset,
				len(records),
			)

			time.Sleep(
				time.Duration(pollInterval) * time.Second,
			)

			continue
		}

		newRows := records[offset:]

		fmt.Printf(
			"\nFound %d new rows to send\n",
			len(newRows),
		)

		for _, row := range newRows {

			msg := buildPowerPlantSyslog(
				hostname,
				app,
				facility,
				severity,
				counter,
				header,
				row,
			)

			_, err := conn.Write([]byte(msg))
			if err != nil {

				log.Println("Send error:", err)

				saveOffset(offset)

				return
			}

			fmt.Printf(
				"[%d] Sent: unit=%s turbine=%s status=%s\n",
				counter,
				getField(row, header, "unit_id"),
				getField(row, header, "turbine_status"),
				getField(row, header, "alarm_status"),
			)

			counter++

			offset++

			saveOffset(offset)

			time.Sleep(
				time.Duration(interval) * time.Millisecond,
			)
		}

		fmt.Printf(
			"\nAll %d rows sent. Watching for new rows...\n",
			offset,
		)
	}
}

func prompt(reader *bufio.Reader, text string) string {

	fmt.Print(text)

	input, _ := reader.ReadString('\n')

	return strings.TrimSpace(input)
}

func promptDefault(
	reader *bufio.Reader,
	text string,
	defaultVal string,
) string {

	fmt.Print(text)

	input, _ := reader.ReadString('\n')

	input = strings.TrimSpace(input)

	if input == "" {
		return defaultVal
	}

	return input
}

func promptInt(
	reader *bufio.Reader,
	text string,
	defaultVal int,
) int {

	fmt.Print(text)

	input, _ := reader.ReadString('\n')

	input = strings.TrimSpace(input)

	if input == "" {
		return defaultVal
	}

	val, err := strconv.Atoi(input)
	if err != nil {

		fmt.Println(
			"Invalid input, using default:",
			defaultVal,
		)

		return defaultVal
	}

	return val
}

func readCSVHeader(path string) ([]string, error) {

	f, err := os.Open(path)
	if err != nil {

		return nil,
			fmt.Errorf("cannot open file: %w", err)
	}

	defer f.Close()

	r := csv.NewReader(f)

	header, err := r.Read()
	if err != nil {

		return nil,
			fmt.Errorf("cannot read header: %w", err)
	}

	return header, nil
}

func readCSVData(path string) ([][]string, error) {

	f, err := os.Open(path)
	if err != nil {

		return nil,
			fmt.Errorf("cannot open file: %w", err)
	}

	defer f.Close()

	r := csv.NewReader(f)

	_, err = r.Read()
	if err != nil {

		return nil,
			fmt.Errorf("cannot read header: %w", err)
	}

	var records [][]string

	for {

		record, err := r.Read()

		if err == io.EOF {
			break
		}

		if err != nil {

			return nil,
				fmt.Errorf("cannot parse row: %w", err)
		}

		records = append(records, record)
	}

	return records, nil
}

func loadOffset() int {

	data, err := os.ReadFile(offsetFile)
	if err != nil {
		return 0
	}

	val, err := strconv.Atoi(
		strings.TrimSpace(string(data)),
	)

	if err != nil {
		return 0
	}

	return val
}

func saveOffset(offset int) {

	os.WriteFile(
		offsetFile,
		[]byte(strconv.Itoa(offset)),
		0644,
	)
}

func getField(
	row []string,
	header []string,
	fieldName string,
) string {

	for i, h := range header {

		if h == fieldName && i < len(row) {
			return row[i]
		}
	}

	return ""
}

func buildPowerPlantSyslog(
	host string,
	app string,
	facility int,
	severity int,
	counter int,
	header []string,
	row []string,
) string {

	pri := facility*8 + severity

	timestamp := time.Now().Format(
		"Jun 03 15:04:05",
	)

	var pairs []string

	for i, h := range header {

		if i < len(row) {

			pairs = append(
				pairs,
				fmt.Sprintf("%s=%s", h, row[i]),
			)
		}
	}

	payload := strings.Join(pairs, " ")

	return fmt.Sprintf(
		"<%d>%s %s %s[%d]: %s\n",
		pri,
		timestamp,
		host,
		app,
		counter,
		payload,
	)
}