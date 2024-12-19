# File: main.py

from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from random import randint, uniform
import asyncio
import json
from datetime import datetime

app = FastAPI()

# Enable CORS for frontend-backend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load initial data from fake_robot_data.json
with open("fake_robot_data.json") as f:
    robots = json.load(f)

# Function to simulate telemetry updates
def update_telemetry():
    for robot in robots:
        robot["Battery Percentage"] = max(0, min(100, robot["Battery Percentage"] + randint(-5, 5)))
        robot["CPU Usage"] = max(0, min(100, robot["CPU Usage"] + randint(-10, 10)))
        robot["RAM Consumption"] = max(0, robot["RAM Consumption"] + randint(-500, 500))
        robot["Location Coordinates"] = [
            round(robot["Location Coordinates"][0] + uniform(-0.01, 0.01), 6),
            round(robot["Location Coordinates"][1] + uniform(-0.01, 0.01), 6),
        ]
        robot["Last Updated"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

# REST API endpoint to fetch robot details
@app.get("/robots")
def get_robots():
    return robots

# WebSocket endpoint for real-time updates
@app.websocket("/ws/robots")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            update_telemetry()
            await websocket.send_json(robots)
            await asyncio.sleep(5)  # Update data every 5 seconds
    except Exception as e:
        print(f"WebSocket disconnected: {e}")
