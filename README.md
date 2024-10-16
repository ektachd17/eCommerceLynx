Product Management REST API


1)**Get a Single Product**
When a single product is requested, all fields of the product are returned, and the view count is incremented.
Optionally, a currency can be specified (USD, CAD) to convert the product price before returning.

Endpoint: GET /products/:id
Parameters:
id (URL param): ID of the product.
currency (optional query param): Convert the price to USD or CAD.
Example:
GET http://localhost:3000/products/1?currency=CAD


2) **List Most Viewed Products**
Return the products with the highest view counts. By default, the top 5 products are returned.
A custom number of products can be specified via a query parameter.
A specific currency (USD, CAD) can be specified to return prices in that currency.

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


