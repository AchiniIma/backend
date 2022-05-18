FROM node:16

WORKDIR /usr/src/app 

COPY . .

RUN npm install

EXPOSE 8087

CMD ["node","server.js"]
