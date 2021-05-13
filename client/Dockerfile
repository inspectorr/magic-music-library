FROM node:14

WORKDIR /client
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn build

CMD yarn start
