import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Import Leaflet
import "leaflet/dist/leaflet.css";
import './App.css';

function App() {
  const [robots, setRobots] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const ws = new WebSocket("wss://robot-fleet.onrender.com/ws/robots");

    ws.onopen = () => {
      console.log("WebSocket connected!");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setRobots(data);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => ws.close(); // Cleanup WebSocket connection on unmount
  }, []);

  const filteredRobots = robots.filter((robot) => {
    if (filter === "active") {
      return robot["Online/Offline"] && robot["Battery Percentage"] > 20;
    } else if (filter === "offline") {
      return !robot["Online/Offline"];
    } else if (filter === "lowBattery") {
      return robot["Battery Percentage"] < 20;
    }
    return true; // "all" filter
  });

  // Function to get the appropriate robot icon based on robot status
  const getIcon = (robot) => {
    // Default robot icon (active robots)
    let iconUrl = "https://img.icons8.com/ios/452/robot.png"; // Default robot icon URL

    // If robot is offline, change icon to a different one
    if (!robot["Online/Offline"]) {
      iconUrl = "https://img.icons8.com/ios/452/robot.png"; // Use the same robot icon for offline as well (or change as needed)
    }

    // If robot has low battery, change icon to a different one
    else if (robot["Battery Percentage"] < 20) {
      iconUrl = "https://img.icons8.com/ios/452/robot.png"; // You can change this to a low-battery icon if desired
    }

    // Return a Leaflet icon with the chosen image
    return new L.Icon({
      iconUrl: iconUrl,
      iconSize: [32, 32], // Customize the size of the icon
      iconAnchor: [16, 32], // The anchor point of the icon
      popupAnchor: [0, -32], // The point from which the popup will open
    });
  };

  return (
    <div className="App">
      <header>
        <h1>Robot Fleet Monitoring Dashboard</h1>
        <div>
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("active")}>Active</button>
          <button onClick={() => setFilter("offline")}>Offline</button>
          <button onClick={() => setFilter("lowBattery")}>Low Battery</button>
        </div>
      </header>
      <main>
        <section className="robot-list">
          <h2>Robot Details</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Battery (%)</th>
                <th>CPU Usage (%)</th>
                <th>RAM (MB)</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {filteredRobots.map((robot) => (
                <tr
                  key={robot["Robot ID"]}
                  className={
                    !robot["Online/Offline"] || robot["Battery Percentage"] < 20
                      ? "highlight"
                      : ""
                  }
                >
                  <td>{robot["Robot ID"]}</td>
                  <td>{robot["Online/Offline"] ? "Online" : "Offline"}</td>
                  <td>{robot["Battery Percentage"]}</td>
                  <td>{robot["CPU Usage"]}</td>
                  <td>{robot["RAM Consumption"]}</td>
                  <td>{robot["Last Updated"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="map-view">
          <h2>Robot Locations</h2>
          <MapContainer center={[0, 0]} zoom={2} style={{ height: "400px" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {filteredRobots.map((robot) => (
              <Marker
                key={robot["Robot ID"]}
                position={robot["Location Coordinates"]}
                icon={getIcon(robot)} // Add the custom robot icon
              >
                <Popup>
                  <b>ID:</b> {robot["Robot ID"]}
                  <br />
                  <b>Battery:</b> {robot["Battery Percentage"]}%
                  <br />
                  <b>Status:</b>{" "}
                  {robot["Online/Offline"] ? "Online" : "Offline"}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </section>
      </main>
    </div>
  );
}

export default App;
