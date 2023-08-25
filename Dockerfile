# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and package-lock.json to the working directory
COPY . .

# Install app dependencies and package them

RUN pnpm install
RUN pnpm package

# Copy the rest of the application code to the container

# Navigate to the inner folder where you want to run the start command
WORKDIR /app/packages/backend

# Run the start command
CMD [ "pnpm", "start" ]
