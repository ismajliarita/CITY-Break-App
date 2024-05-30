const express = require('express');
const { body } = require("express-validator");
const fs = require('fs');
const path = require('path');
const verifyToken = require("../middleware/verifyToken");
const inputValidation = require("../middleware/inputValidation");
const usersRouter = express.Router();

const UserController = require('../controllers/usersController');

usersRouter.get(
  '/get-users/:id',
  UserController.getUsers,
);

usersRouter.post(
  "/verify-email",
  UserController.verifyEmail
);

usersRouter.post(
  '/signup',
  [
    body("email").normalizeEmail().isEmail(),
    body("password").isLength({ min: 8 }),
  ],
  inputValidation,
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

usersRouter.get(
  '/get-user/:id',
  UserController.getUser,
);

//----------------- VERIFIED ROUTES -----------------//
usersRouter.use(verifyToken);

usersRouter.get(
  '/get-all-users',
  UserController.getAllUsers,
);

usersRouter.delete(
  '/delete-user/:id',
  UserController.deleteUser,
);

usersRouter.patch(
  '/change-username/:id',
  UserController.changeUsername,
);

usersRouter.patch(
  '/change-password/:id',
  UserController.changePassword,
);

module.exports = usersRouter;