const express = require('express');
const { body } = require("express-validator");
const fs = require('fs');
const path = require('path');
const itemsRouter = express.Router();
const multer = require('multer');
const verifyToken = require("../middleware/verifyToken");

const ItemsController = require('../controllers/itemsController');

const upload = multer({
  // limits: {
  //   fileSize: 1000000,
  // },
  fileFilter(req, file, cb) {
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
      return cb(new Error('Please upload an image'));
    }
    cb(undefined, true);
  }
});

//   ROUTES

itemsRouter.get(
  "/get-items",
  ItemsController.getItems
);  

itemsRouter.get(
  '/:id/image',
  ItemsController.getItemImage,
);

itemsRouter.use(verifyToken);


itemsRouter.post(
  "/update-item/:id",
  upload.single("image"),
  ItemsController.updateItem
);

itemsRouter.post(
  "/create-item",
  upload.single("image"),
  ItemsController.createItem
);

itemsRouter.get(
  '/get-item/:id',
  ItemsController.getItemById,
);

itemsRouter.patch(
  '/subtract-amount/:id',
  ItemsController.subtractAmount,
);

itemsRouter.patch(
  '/remove-amounts',
  ItemsController.removeItemAmounts,
);

itemsRouter.delete(
  "/delete-item", 
  ItemsController.deleteItem
);

module.exports = itemsRouter;