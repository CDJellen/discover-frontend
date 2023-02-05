FROM node:16-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 5173

ENV HOST=0.0.0.0

ENTRYPOINT [ "npm", "run", "dev" ]
