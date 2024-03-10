const express = require('express');
const { body } = require("express-validator");
const itemsRouter = express.Router();

const ItemsController = require('../controllers/itemsController');

itemsRouter.get(
  "/",
  ItemsController.getItems
);  

itemsRouter.post(
  "/create-item",
  [
    body("name").isLength({ min: 1 }).withMessage("Name is required"),
    body("image").isLength({ min: 1 }).withMessage("Image is required"),
    body("description").isLength({ min: 1 }).withMessage("Description is required"),
    body("price").isLength({ min: 1 }).withMessage("Price is required"),
  ],
  ItemsController.createItem
);

module.exports = itemsRouter;
