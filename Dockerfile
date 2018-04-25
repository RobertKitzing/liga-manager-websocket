FROM node:carbon

WORKDIR /usr/src/app

COPY ./package.json .
COPY ./dist .

RUN npm install --quiet

# RUN node dist/index.js
CMD [ "node", "index.js" ]