const express = require('express');
const { body } = require("express-validator");
const fs = require('fs');
const path = require('path');
const itemsRouter = express.Router();
const multer = require('multer');

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

itemsRouter.get(
  "/",
  ItemsController.getItems
);  

itemsRouter.post(
  "/create-item",
  upload.single("image"),
  ItemsController.createItem
  // async (req, res) => {

  //   const buffer = req.file.buffer;




  //   // const buffer =  Buffer.from(req.body.image, 'base64');
    
  //   fs.writeFile(path.join(__dirname, "arita.png"), buffer, (err) => {
  //     if (err) {
  //       return res.status(500).json({ error: err.message });
  //     }
      
  //     res.status(200).json({ data: req.body.name, imagePath: "arita.png" });
  //   });
  // }
);

itemsRouter.get(
  '/:id/image',
  ItemsController.getItemImage,
  // (req, res) => {
  // const id = req.params.id;



  // const imagePath = path.join(__dirname, 'arita.png');
  
  // // Set the Content-Type header to image/png
  // res.setHeader('Content-Type', 'image/png');

  // // Send the image file as a response
  // res.sendFile(imagePath, (err) => {
  //   if (err) {
  //     res.status(500).json({ error: err.message });
  //   }
  // });
// }
);

module.exports = itemsRouter;