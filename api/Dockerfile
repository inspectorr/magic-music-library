FROM node:14

WORKDIR /api
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .

EXPOSE 3001
CMD yarn start:prod
