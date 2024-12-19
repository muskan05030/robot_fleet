# Robot Fleet Monitoring Dashboard

This project is a web-based dashboard for monitoring a fleet of robots. It provides real-time data about robot statuses, battery levels, and locations using WebSocket communication. The dashboard allows users to filter robots based on their status (active, offline, low battery) and view their locations on a map.

## Features

- **Real-Time Robot Data**: Monitor robot statuses (online/offline), battery percentage, CPU usage, RAM consumption, and last update.
- **Map View**: View the real-time locations of the robots on an interactive map.
- **Filtering**: Filter robots based on their status (active, offline, low battery).
- **WebSocket**: The frontend communicates with the backend using WebSocket to display live updates.

## Technologies Used

- **Frontend**: React, Leaflet, WebSocket, CSS
- **Backend**: FastAPI, WebSocket
- **Deployment**:
  - **Frontend**: Deployed on [Netlify](https://www.netlify.com)
  - **Backend**: Deployed on [Render](https://render.com)
  
## Project Setup

### Prerequisites

- Node.js (for frontend development)
- Python 3.8+ (for backend development)
- WebSocket-compatible backend (FastAPI server)

### Frontend Setup

1. Clone the repository:
   git clone https://github.com/yourusername/robot_fleet.git
   cd robot_fleet/frontend

2. Install dependencies:
   npm install
   

3. Run the frontend development server:
   npm start


### Backend Setup

1. Clone the repository:
   git clone https://github.com/yourusername/robot_fleet.git
   cd robot_fleet/backend

2. Create a virtual environment:
   python -m venv venv

3. Activate the virtual environment:
   - On Windows:
     venv\Scripts\activate

   - On macOS/Linux:
     source venv/bin/activate

4. Install the backend dependencies:
   pip install -r requirements.txt

5. Run the backend server:
   uvicorn main:app --reload

### Docker Setup

To containerize the application using Docker, follow these steps:

1. **Build the Docker image**:
   docker build -t robot-fleet .

2. **Run the Docker container**:
   docker run -p 8000:8000 robot-fleet

## Deployment

### Frontend (Netlify)

1. Push your code to GitHub (frontend folder).
2. Log into [Netlify](https://www.netlify.com) and create a new site from GitHub.
3. Set the build command to npm run build and the publish directory to build/.
4. Deploy the site.

### Backend (Render)

1. Push your code to GitHub (backend folder).
2. Log into [Render](https://render.com) and create a new web service.
3. Set up the service with the necessary configurations, including environment variables and ports.

## Contributing

If you would like to contribute to the project, please fork the repository and create a pull request with your changes. 

1. Fork the repository
2. Create a new branch (git checkout -b feature/your-feature)
3. Commit your changes (git commit -am 'Add new feature')
4. Push to the branch (git push origin feature/your-feature)
5. Create a new pull request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
