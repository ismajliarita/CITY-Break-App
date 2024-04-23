const express = require('express');
const { body } = require("express-validator");
const fs = require('fs');
const path = require('path');
const usersRouter = express.Router();
const multer = require('multer');

const UserController = require('../controllers/usersController');

usersRouter.get(
  '/get-users/:id',
  UserController.getUsers,
);


module.exports = usersRouter;