# Use Node.js LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy backend source code
COPY . .

# Expose backend port (e.g., 5000 or 8080 depending on your server)
EXPOSE 5000

# Run backend server
CMD ["npm", "start"]
