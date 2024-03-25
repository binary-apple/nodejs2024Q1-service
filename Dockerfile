FROM node:20-alpine

EXPOSE ${PORT}

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "start:dev" ]
