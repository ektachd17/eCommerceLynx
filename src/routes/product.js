const express = require("express");
const productRouter = express.Router();
require('dotenv').config();
const { Product, Sequelize } = require('../models/product');
const axios = require('axios');

// Convert currency (mock implementation for simplicity)
const convertCurrency = async (amount, fromCurrency, toCurrency) => {
    if (fromCurrency === toCurrency) return amount;
    
    const response = await axios.get('http://api.currencylayer.com/live', {
      params: {
        access_key: process.env.CURRENCY_API_KEY,
        currencies: `${fromCurrency},${toCurrency}`,
        format: 1
      }
    });
    
    const exchangeRate = response.data.quotes[`USD${toCurrency}`] / 1;
    
    return amount * exchangeRate;
  };
  
  // Route to get a single product
  productRouter.get('/products/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { currency } = req.query;
      const product = await Product.findByPk(id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
  
      // Increment view count
      product.productViewed += 1;
      await product.save();
  
      // Convert price if currency is specified
      let price = product.price;
      if (currency) {
        price = await convertCurrency(product.price, 'USD', currency);
      }
      console.log(price)
      res.json({
        id: product.id,
        name: product.name,
        description: product.description,
        price: price.toFixed(2),
        currency: currency || product.currency,
        view_count: product.productViewed,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Route to get the most viewed products
  productRouter.get('/products/most-viewed', async (req, res) => {
    try {
      const { limit = 5, currency } = req.query;
  
      const products = await Product.findAll({
        where: {
          view_count: { [Sequelize.Op.gt]: 0 },
        },
        order: [['view_count', 'DESC']],
        limit: parseInt(limit, 10),
      });
  
      const result = await Promise.all(
        products.map(async (product) => {
          let price = product.price;
          if (currency) {
            price = await convertCurrency(product.price, product.currency, currency);
          }
          return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: price.toFixed(2),
            currency: currency || product.currency,
            view_count: product.productViewed,
          };
        })
      );
  
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  module.exports = productRouter;