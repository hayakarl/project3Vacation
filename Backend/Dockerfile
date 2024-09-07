# Installing Linux Alpine OS Specific version + Node.js Specific version:
FROM node:20-alpine3.20

# Intall ts-node and nodemon globally during image creation:
RUN npm i -g ts-node
RUN npm i -g nodemon

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



# Build image without the ability for docker-hub puslish:
# docker build -t <image-name> <Dockerfile-location>
# docker build -t vacations-image .

# Build image with the ability for docker-hub puslish:
# docker build -t <docker-hub-username>/<image-name>:<version> .
# docker build -t haya1701/vacations-image:1.0 .

# Show all images: 
# docker image

# Build container running our image: 
# docker create --name <container-name> -p <host-port>:<container-port> <image-name>
# docker create --name vacations-container -p 4040:4000 vacations-image

# Run the container:
# docker start <container-name>
# docker start vacations-container
