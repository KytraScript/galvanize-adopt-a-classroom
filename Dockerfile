# Use an official Node runtime as a parent image
FROM node:12.7.0-alpine

# Set the working directory to /D3
WORKDIR '/D3'

# Copy package.json to the working directory
COPY package.json .

# Install any needed packages specified in package.json
RUN yarn

# Copying the rest of the code to the working directory
COPY . .

# Make port 5500 available to the world outside this container
EXPOSE 5500

# Run npm start when the container launches
CMD ["npm", "start"]
