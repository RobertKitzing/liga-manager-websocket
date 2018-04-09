FROM node:carbon

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install -g gulp
RUN npm install

COPY . .

RUN gulp clean
RUN gulp

CMD [ "npm", "start" ]