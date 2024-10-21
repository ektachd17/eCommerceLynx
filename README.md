Product Management REST API


1) Get a Single Product


Endpoint: GET /products/:id
Parameters:
id (URL param): ID of the product.
currency (optional query param): Convert the price to USD or CAD.
Example:
GET http://localhost:3000/products/1?currency=CAD


2) List Most Viewed Products

Endpoint: GET /products/most-viewed
Parameters:
limit (optional query param): Number of products to return (default: 5).
currency (optional query param): Convert the prices to USD or CAD.
Example:
GET http://localhost:3000/products/most-viewed?limit=3&currency=CAD


ENV file needs to have

DB_NAME=product_db
DB_USER=root
DB_PASS=password
DB_HOST=localhost
DB_PORT=3306
CURRENCY_API_KEY=your_currencylayer_api_key


