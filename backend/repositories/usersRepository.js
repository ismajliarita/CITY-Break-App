const { createUser } = require("../controllers/usersController");
const db = require("../models");
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const Order = db.Order;
const Item = db.Item;
const User = db.User;

const UsersRepo = {
  async createUser(userData) {
    try{
      console.log("REPO", userData);
      const { email, username, password, isAdmin } = userData;
      const passwordString = password.toString();
      const hashedPassword = await bcrypt.hash(passwordString, 10);
      return await User.create({
        email,
        username,
        password: hashedPassword,
        isAdmin,
      });
    }catch(error){
      throw error;
    }
  },
  
}

module.exports = UsersRepo;