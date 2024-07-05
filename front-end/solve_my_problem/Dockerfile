FROM node:18

LABEL maintainer="alexiadisanton@gmail.com harrypapadakis02@gmail.com nikolasbv10@gmail.com chrisostomoskopitas@gmail.com"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

RUN apt-get update && apt-get install -y curl

EXPOSE 4000


CMD [ "node", "server.js" ]
