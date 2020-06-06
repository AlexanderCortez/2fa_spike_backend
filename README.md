# How to start?

Create a `.env` file at the root of the project, replacing XXXX values with user specific


```bash
DATABASE_HOST=XXXX
DATABASE_USERNAME=XXXX
DATABASE_NAME=XXXX
DATABASE_PASSWORD=XXXX
DATABASE_PORT=XXXX
JWT_SECRET_TOKEN=XXXX
```

## Running Locally

```bash
#1 Installation
$ npm install

#2 run in development
$ npm run docker:dev:start
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```