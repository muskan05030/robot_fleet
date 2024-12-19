# Frontend Dockerfile
FROM node:16

# Set the working directory
WORKDIR /app

# Copy the required files into the container
COPY . /app

# Install dependencies
RUN npm install

# Build the React app
RUN npm run build

# Expose the frontend port
EXPOSE 3000

# Serve the frontend using a simple server
CMD ["npm", "start"]
