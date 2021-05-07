# Demo
https://magic-music-library.herokuapp.com

# API documentation
https://magic-music-library-api.herokuapp.com/api/swagger

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
Fill out .env.local from .env.local.example, then run:
```
yarn install
yarn dev
```

# Deployment
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
