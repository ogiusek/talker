# docker build -t talker -f talker.dockerfile .
# docker run -p 3000:3000 -d talker

# FROM node:16-alpine

# WORKDIR /app
# COPY . /app

# RUN npm ci
# # RUN npm i
# RUN npm run build

# EXPOSE 3000

# CMD [ "npx", "serve", "build" ]

FROM node:16-alpine 

WORKDIR /app
COPY . /app

RUN npm i --force
RUN npm rebuild node-sass

# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000
# Start the app
CMD [ "npm", "start" ]