# Typescript Shopping Cart

Implementation of a Restful shopping cart microservice using Typescript.

## Technologies used
* Typescript
* NodeJS
* Inversify
* Express
* Jest

## Running locally

### Installation
```bash
git clone https://github.com/brettc-84/ts-shoppingcart.git
cd ts-shoppingcart
npm i
```

### Running tests
```bash
npm test
```

### Running the server in watch mode
```bash
npm run start:dev
```

### Running the server using docker
```bash
docker-compose up
```

## Available APIs
```bash
# Create test data
curl -L -X POST 'localhost:3000/baskets/createData'

# Get baskets
curl -L -X GET 'localhost:3000/baskets/1' 

# Add item
curl -L -X POST 'localhost:3000/baskets/1/items' \
-H 'Content-Type: application/json' \
--data-raw '{
    "sku": "36055",
    "quantity": 1
}'

# Increase quantity of item
curl -L -X PATCH 'localhost:3000/baskets/1/items/102' \
-H 'Content-Type: application/json' \
--data-raw '{
    "action": "inc",
    "amount": 1
}'

# Decrease quantity of item
curl -L -X PATCH 'localhost:3000/baskets/1/items/102' \
-H 'Content-Type: application/json' \
--data-raw '{
    "action": "dec",
    "amount": 1
}'

# Delete item
curl -L -X DELETE 'localhost:3000/baskets/1/items/102'

# Create a new basket
curl -L -X POST 'localhost:3000/baskets/'
```
