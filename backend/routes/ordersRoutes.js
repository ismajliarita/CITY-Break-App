const express = require('express');
const { body } = require("express-validator");
const fs = require('fs');
const path = require('path');
const ordersRouter = express.Router();
const multer = require('multer');

const OrdersController = require('../controllers/ordersController');



ordersRouter.get(
  '/get-finished-orders/:id',
  OrdersController.getFinishedOrders,
);

ordersRouter.post(
  '/create-order',
  OrdersController.createOrderAsAdmin,
);


module.exports = ordersRouter;