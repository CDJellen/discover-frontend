FROM node:16-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV PUBLIC_WRITE_FOOTER=true
ENV PUBLIC_API_ENDPOINT=http://localhost:8080/api/v1

RUN touch .env
RUN printenv > .env

RUN npm run build

EXPOSE 5173

ENTRYPOINT [ "npm", "run", "preview" ]
