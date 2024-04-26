const express = require('express');
const { body } = require("express-validator");
const fs = require('fs');
const path = require('path');
const ordersRouter = express.Router();
const multer = require('multer');

const OrdersController = require('../controllers/ordersController');



ordersRouter.get(
  '/get-orders',
  OrdersController.getOrders,
);

ordersRouter.post(
  '/create-order',
  OrdersController.createOrder,
);


module.exports = ordersRouter;