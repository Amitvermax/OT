package main

import (
	"bufio"   // Buffered I/O operations
	"fmt"     // Printing/output functions
	"log"     // Logging errors and messages
	"net"     // TCP networking
	"os"      // File operations
	"strings" // String manipulation
)

func main() {

	// Create a reader to take user input from keyboard
	reader := bufio.NewReader(os.Stdin)

	// Ask user for the port number on which receiver should listen
	port := prompt(
		reader,
		"Enter port to listen on (default 514): ",
	)

	// If user presses Enter without entering a port,
	// use the default Syslog port 514
	if port == "" {
		port = "514"
	}

	// Start a TCP listener on the specified port
	// Example:
	// :514
	// :9000
	listener, err := net.Listen(
		"tcp",
		":"+port,
	)

	if err != nil {

		log.Fatalf(
			"Failed to start server: %v",
			err,
		)
	}

	// Ensure listener closes when program exits
	defer listener.Close()

	fmt.Println(
		"Syslog receiver listening on port",
		port,
	)

	// Infinite loop waiting for incoming connections
	for {

		// Accept a new client connection
		conn, err := listener.Accept()

		if err != nil {

			log.Println(
				"Accept error:",
				err,
			)

			continue
		}

		// Display sender IP and port
		fmt.Println(
			"New connection from",
			conn.RemoteAddr(),
		)

		// Handle each connection in a separate goroutine
		// This allows multiple senders simultaneously
		go handleConnection(conn)
	}
}

// Helper function to display prompt and get user input
func prompt(
	reader *bufio.Reader,
	text string,
) string {

	fmt.Print(text)

	// Read until Enter key
	input, _ := reader.ReadString('\n')

	// Remove spaces and newline characters
	return strings.TrimSpace(input)
}

// Handles communication with a connected sender
func handleConnection(conn net.Conn) {

	// Ensure connection closes when function exits
	defer conn.Close()

	// Scanner reads incoming data line-by-line
	scanner := bufio.NewScanner(conn)

	// Read messages continuously
	for scanner.Scan() {

		// Get one line/message
		msg := scanner.Text()

		// Display received message on console
		fmt.Println(
			"Received:",
			msg,
		)

		// Save message to log file
		appendToFile(
			"logs.txt",
			msg,
		)
	}

	// Check if scanner encountered an error
	if err := scanner.Err(); err != nil {

		log.Println(
			"Read error:",
			err,
		)
	}

	// Connection ended
	fmt.Println(
		"Connection closed:",
		conn.RemoteAddr(),
	)
}

// Appends received messages to a text file
func appendToFile(
	filename string,
	msg string,
) {

	// Open file in append mode
	// Create file if it doesn't exist
	f, err := os.OpenFile(
		filename,
		os.O_APPEND|
			os.O_CREATE|
			os.O_WRONLY,
		0644,
	)

	if err != nil {

		log.Println(
			"File error:",
			err,
		)

		return
	}

	// Ensure file closes after writing
	defer f.Close()

	// Write received message followed by newline
	f.WriteString(msg + "\n")
}