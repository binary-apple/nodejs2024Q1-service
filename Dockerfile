FROM node:20-alpine

ARG PORT=4000

EXPOSE ${PORT}

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]
