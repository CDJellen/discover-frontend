FROM node:16-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 5173

ENV HOST=0.0.0.0

ENTRYPOINT [ "npm", "run", "preview" ]
