FROM node:14

LABEL maintainer="alexiadisanton@gmail.com"
LABEL version="1.0"
LABEL description="This service handles credit additions for users."

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

HEALTHCHECK --interval=5m --timeout=3s \
  CMD curl -f http://localhost:3000/ || exit 1

CMD ["node", "app.js"]
