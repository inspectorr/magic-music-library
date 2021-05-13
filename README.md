# Demo
https://magicmusiclibrary.ml

# API documentation
https://magicmusiclibrary.ml/api/swagger

# Development
Frontend only (with production api) - runs on 3000 by default:
```
cd client
yarn install
yarn dev:remote
```
or, for local (with local api):
```
yarn dev:local
```
API (runs on 3001 by default):
```
cd api
```
Fill out ```.env.local``` from ```.env.local.example```, then run:
```
yarn install
yarn dev
```

# Deployment

## Dedicated server
[on your local computer]
- [X] Clone the repository
- [X] Ensure docker, docker-compose are installed
- [X] Login to docker
- [X] For the ```/client```, specify:
```
client/.env.local

NEXT_PUBLIC_API_URL_PROD=https://magicmusiclibrary.ml/api
NEXT_PUBLIC_WEB_URL_PROD=https://magicmusiclibrary.ml
NEXT_PUBLIC_API_URL_DEV=http://localhost:3001/api
NEXT_PUBLIC_WEB_URL_DEV=http://localhost:3000
```
- [X] Run to build and pull images:
```
yarn jobs:build
```
[then, on your remote server]
- [X] Clone the repository
- [X] Setup empty database and get it's url with all access keys included
- [X] Create ```.env``` file in root folder from ```.env.example```
```
DATABASE_URL=<>
ROOT_ADMIN_EMAIL=admin@mmlib.com
ROOT_ADMIN_PASSWORD=<>
SERVER_SECRET=<>
```
- [X] Ensure docker, docker-compose, nginx, certbot, cerbot nginx plugin are installed
- [X] Setup nginx config by ```nginx/sample.conf```
- [X] Login to docker
- [X] Run to pull and compose up images:
```
yarn jobs:deploy
```   
- [X] Run to enable https by certbot securing:
```
yarn jobs:secure
```

## Heroku [DEPRECATED]
Create 2 apps on heroku, one for api and one for client, specify git urls in package.json
```
"deploy:production:api": "git subtree push --prefix api https://git.heroku.com/magic-music-library-api.git master",
"deploy:production:client": "git subtree push --prefix client https://git.heroku.com/magic-music-library.git master"
```
Create variables on heroku's dashboard (for api):
```
DATABASE_URL=<>
NPM_CONFIG_PRODUCTION=false
ROOT_ADMIN_EMAIL=<>
ROOT_ADMIN_PASSWORD=<>
```
For the client, specify urls in .env.local:
```
NEXT_PUBLIC_API_URL_PROD=https://magic-music-library-api.herokuapp.com/api
NEXT_PUBLIC_WEB_URL_PROD=https://magic-music-library.herokuapp.com
NEXT_PUBLIC_API_URL_DEV=http://localhost:3001/api
NEXT_PUBLIC_WEB_URL_DEV=http://localhost:3000
```
