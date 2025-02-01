# Use official Node.js image as base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Initialize a new package.json inside Docker
RUN npm init -y

# Add a start script to package.json
RUN node -e "let pkg=require('./package.json'); pkg.scripts={start: 'react-scripts start'}; require('fs').writeFileSync('package.json', JSON.stringify(pkg, null, 2));"

# Install necessary dependencies
RUN npm install react react-dom react-router-dom redux react-redux @reduxjs/toolkit axios node-sass react-scripts
RUN npm install web-vitals

# Copy the rest of the application files
COPY . .

# Expose port 3000 for development
EXPOSE 3000

# Start the React application
CMD ["npm", "start"]
