import json
import requests
import urllib3
import logging
import os
import sys
import time
import re

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# =========================================================
# Logging Configuration
# =========================================================

LOG_PATH = r"C:\Users\cdot\Desktop\test_pipeline\log_forwarder.log"

logging.basicConfig(
    filename=LOG_PATH,
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

# =========================================================
# OpenSearch Configuration
# =========================================================

OPENSEARCH_HOST = "https://172.24.32.131:9200"

INDEX = "scada_smoke"

USERNAME = "admin"

PASSWORD = os.getenv("OPENSEARCH_PASSWORD")

if not PASSWORD:
    logging.error(
        "OPENSEARCH_PASSWORD environment variable not set"
    )

    sys.exit(
        "ERROR: OPENSEARCH_PASSWORD environment variable not set"
    )

# =========================================================
# File Configuration
# =========================================================

LOG_FILE = r"C:\Users\cdot\Desktop\test_pipeline\logs.txt"

STATE_FILE = r"C:\Users\cdot\Desktop\test_pipeline\.scada_smoke_offset"

# =========================================================
# Offset Handling
# =========================================================

def load_offset():

    if os.path.exists(STATE_FILE):

        with open(STATE_FILE, "r") as f:
            return int(f.read().strip())

    return 0


def save_offset(offset):

    with open(STATE_FILE, "w") as f:
        f.write(str(offset))

# =========================================================
# Parse Syslog Line
# =========================================================

def parse_log_line(line):

    try:

        # Remove syslog prefix
        # Everything after ]:
        if "]:" in line:
            line = line.split("]:", 1)[1].strip()

        # Extract key=value pairs
        matches = re.findall(
            r'(\w+)=([^\s]+)',
            line
        )

        data = {}

        for key, value in matches:
            data[key] = value

        event = {

            "timestamp": data["timestamp"],

            "log_type": data["log_type"],

            "tunnel_id": data["tunnel_id"],

            "temperature_c": float(
                data["temperature_c"]
            ),

            "smoke_density": float(
                data["smoke_density"]
            ),

            "airflow_m_s": float(
                data["airflow_m_s"]
            ),

            "oxygen_percent": float(
                data["oxygen_percent"]
            ),

            "co_level_ppm": float(
                data["co_level_ppm"]
            ),

            "fan_status": data["fan_status"],

            "fan_speed_rpm": int(
                data["fan_speed_rpm"]
            ),

            "emergency_mode": (
                data["emergency_mode"].lower() == "true"
            ),

            "power_consumption_kw": float(
                data["power_consumption_kw"]
            ),

            "alarm": data["alarm"]
        }

        return event

    except Exception as e:

        logging.error(
            f"Log parsing error: {e} | Line: {line.strip()}"
        )

        print(f"Log parsing error: {e}")

        return None

# =========================================================
# Send Bulk Data to OpenSearch
# =========================================================

def send_bulk(events):

    if not events:
        return

    bulk_data = ""

    for event in events:

        doc_id = (
            f"{event['tunnel_id']}_"
            f"{event['timestamp']}"
        )

        bulk_data += json.dumps({
            "index": {
                "_index": INDEX,
                "_id": doc_id
            }
        }) + "\n"

        bulk_data += json.dumps(event) + "\n"

    try:

        response = requests.post(
            f"{OPENSEARCH_HOST}/_bulk",
            auth=(USERNAME, PASSWORD),
            headers={
                "Content-Type": "application/json"
            },
            data=bulk_data,
            verify=False,
            timeout=30
        )

        result = response.json()

        if result.get("errors"):

            logging.error(
                "Bulk insert errors occurred"
            )

            print(
                "Bulk insert errors occurred"
            )

            print(json.dumps(result, indent=2))

        else:

            logging.info(
                f"{len(events)} records indexed successfully"
            )

            print(
                f"{len(events)} records indexed successfully"
            )

    except Exception as e:

        logging.error(
            f"Failed to send bulk data: {e}"
        )

        print(f"Failed to send bulk data: {e}")

# =========================================================
# Read Log File and Forward New Records
# =========================================================

def process_logs():

    last_offset = load_offset()

    file_size = os.path.getsize(LOG_FILE)

    # Detect truncation / reset
    if last_offset > file_size:

        logging.warning(
            "Log file reset detected. Resetting offset."
        )

        last_offset = 0

    events = []

    with open(LOG_FILE, "r", encoding="utf-8") as logfile:

        logfile.seek(last_offset)

        # Skip partial line if not at beginning
        if last_offset != 0:
            logfile.readline()

        for line in logfile:

            line = line.strip()

            if not line:
                continue

            event = parse_log_line(line)

            if event:
                events.append(event)

        current_offset = logfile.tell()

        save_offset(current_offset)

    send_bulk(events)

# =========================================================
# Main Continuous Loop
# =========================================================

def main():

    logging.info(
        "SCADA Smoke Syslog → OpenSearch Forwarder Started"
    )

    print(
        "SCADA Smoke Syslog → OpenSearch Forwarder Started"
    )

    while True:

        try:

            process_logs()

        except Exception as e:

            logging.error(
                f"Runtime error: {e}"
            )

            print(f"Runtime error: {e}")

        time.sleep(5)

# =========================================================
# Entry Point
# =========================================================

if __name__ == "__main__":
    main()