FROM node:18

LABEL maintainer="alexiadisanton@gmail.com harrypapadakis02@gmail.com nikolasbv10@gmail.com chrisostomoskopitas@gmail.com"

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production

COPY . .

RUN apt-get update && apt-get install -y python3 python3-pip python3-venv

RUN python3 -m venv /usr/src/app/venv
RUN /usr/src/app/venv/bin/pip install ortools

ENV VIRTUAL_ENV=/usr/src/app/venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

EXPOSE 3006

HEALTHCHECK --interval=60s --timeout=10s --retries=3 CMD curl -f http://localhost:3006/health || exit 1

CMD [ "node", "server.js" ]
