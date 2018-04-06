FROM node:carbon

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install -g typescript
RUN npm install

COPY . .

RUN tsc

EXPOSE 9898

CMD [ "npm", "start" ]