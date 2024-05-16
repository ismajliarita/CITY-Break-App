const express = require('express');
const { body } = require("express-validator");
const fs = require('fs');
const path = require('path');
const verifyToken = require("../middleware/verifyToken");
const inputValidation = require("../middleware/inputValidation");
const usersRouter = express.Router();

const UserController = require('../controllers/usersController');
const { verify } = require('crypto');

usersRouter.get(
  '/get-users/:id',
  UserController.getUsers,
);

usersRouter.post(
  '/signup',
  UserController.createUser,
);

usersRouter.post(
  '/login',
  [
    body("email").normalizeEmail().isEmail(),
    body("password").isLength({ min: 8 }),
  ],
  inputValidation,
  UserController.loginUser,
);

//----------------- VERIFIED ROUTES -----------------//
usersRouter.use(verifyToken);

module.exports = usersRouter;