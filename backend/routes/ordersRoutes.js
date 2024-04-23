const express = require('express');
const { body } = require("express-validator");
const fs = require('fs');
const path = require('path');
const ordersRouter = express.Router();
const multer = require('multer');

const OrdersController = require('../controllers/ordersController');

ordersRouter.post(
  '/add-item/:id',
  OrdersController.addItem,
);


module.exports = ordersRouter;