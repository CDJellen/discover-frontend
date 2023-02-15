FROM node:16-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV PUBLIC_WRITE_FOOTER=true
ENV PUBLIC_API_ENDPOINT=0.0.0.0:8080/api/v1
RUN touch .env
RUN printenv > .env

EXPOSE 5173

ENTRYPOINT [ "npm", "run", "dev" ]
