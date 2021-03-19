const express = require('express');
const cartController = require('./controller/Cart');
const route = express.Router();

route.post('/addToCart',cartController.addToCart);
route.post('/removeFromCart',cartController.removeFromCart);

module.exports = route;