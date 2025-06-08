#!/bin/bash
# filepath: /home/nikhilanand/Downloads/daily-notes-app/start-app.sh

# Change to the application directory
# cd /home/nikhilanand/Downloads/daily-notes-app

# Load environment variables
export $(grep -v '^#' .env | xargs)

npm install --legacy-peer-deps

npm run build

# Start the application
npm start 