FROM node:carbon

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install -g gulp
RUN npm install

COPY . .

RUN gulp

EXPOSE 9898

CMD [ "npm", "start" ]