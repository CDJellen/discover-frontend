FROM node:16-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV PUBLIC_WRITE_FOOTER=true

RUN touch .env
RUN printenv > .env

EXPOSE 5173

ENTRYPOINT [ "npm", "run", "dev" ]
