boilerplate for Typescript Express app.

ref: https://auth0.com/blog/node-js-and-typescript-tutorial-build-a-crud-api/

# command history

```
# in the root directory executed the following commands
yarn init -y

yarn add express dotenv cors helmet
yarn add -D typescript
yarn add -D @types/node @types/express @types/dotenv @types/cors @types/helmet
yarn add -D ts-node
yarn run tsc --init
yarn add -D ts-node-dev
yarn add -D @types/es6-promise

yarn add express-jwt jwks-rsa
yarn add -D @types/express-jwt

yarn add morgan
yarn add -D @types/morgan
```

# run dev server
```
yarn run dev
```

# run console
```
yarn run ts-node
```

# curl
## GET
curl localhost:7000/api/menu/items

## POST
```
# should be error
curl -X POST -H "Content-Type: application/json" -d '{"Name":"sensuikan1973", "Age":"100"}' localhost:7000/api/menu/items
```

## PUT
```
# update existing item
curl -X PUT  -H "Content-Type: application/json" -d '{"Name":"sensuikan1973", "Age":"100"}' localhost:7000/api/menu/items/2

# create new item
curl -X PUT  -H "Content-Type: application/json" -d '{"key1":"value1", "key2":"value2"}' localhost:7000/api/menu/items/1458

# invalid request
curl -X PUT  -H "Content-Type: application/json" -d '{"key1":"value1", "key2":"value2"}' localhost:7000/api/menu/items/test

```
