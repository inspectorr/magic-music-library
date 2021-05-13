FROM node:14

WORKDIR /api
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .

CMD yarn start:prod
