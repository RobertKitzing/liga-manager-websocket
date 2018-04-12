FROM node:carbon

WORKDIR /usr/src/app

COPY . .

RUN npm install --quiet

# RUN node dist/index.js
CMD [ "node", "dist/index.js" ]