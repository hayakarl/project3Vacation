# Installing Linux Alpine OS Specific version + Node.js Specific version:
FROM node:20-alpine3.20

# Create app directory: 
WORKDIR /app

# Copy only package.json into /app
COPY package.json /app

# Intall node_modules in a terminal inside the image: 
RUN npm i


# Copy our code from host machine (located in current folder) into image /app folder:
COPY . /app

# What is the terminal command which runs our app when container starts: 
ENTRYPOINT npm start
