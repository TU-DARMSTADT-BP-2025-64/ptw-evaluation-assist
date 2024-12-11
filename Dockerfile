# Stage 1: Build
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the SvelteKit application
RUN npm run build

# Stage 2: Production
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy only the build output and production dependencies from the first stage
COPY --from=builder /usr/src/app/build ./build
COPY --from=builder /usr/src/app/package*.json ./

# Install only production dependencies (if any)
RUN npm install --production

# Expose the port your app will run on (default: 3000)
EXPOSE 3000

# Define the command to run the app
CMD ["node", "build"]