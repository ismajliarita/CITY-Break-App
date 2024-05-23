const express = require('express');
const { body } = require("express-validator");
const fs = require('fs');
const path = require('path');
const ordersRouter = express.Router();
const multer = require('multer');
const verifyToken = require("../middleware/verifyToken");

const OrdersController = require('../controllers/ordersController');

ordersRouter.use(verifyToken);

ordersRouter.get(
  '/get-finished-orders/:id',
  OrdersController.getFinishedOrders,
);

ordersRouter.post(
  '/create-order-as-admin',
  OrdersController.createOrderAsAdmin,
);

ordersRouter.post(
  '/create-order',
  OrdersController.createOrder,
);

ordersRouter.get(
  '/get-orders/:id',
  OrdersController.getOrders,
);


module.exports = ordersRouter;