# docker build -t talker -f talker.dockerfile .
# docker run -p 3000:3000 -d talker

FROM node:16-alpine 

WORKDIR /app
COPY . /app

RUN npm i --force
RUN npm rebuild node-sass

EXPOSE 3000
CMD [ "npm", "start" ]