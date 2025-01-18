# Use the official Node.js image
FROM node:21

WORKDIR /app

# Copy the application code
COPY . .

RUN npm install

# Build the application
RUN npm run build

# Expose port 3001
EXPOSE 3001

# Start the application in production mode
CMD ["npm", "run", "start:prod"]
