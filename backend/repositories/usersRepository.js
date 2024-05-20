const db = require("../models");
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const Order = db.Order;
const Item = db.Item;
const User = db.User;

const UsersRepo = {
  async createUser(userData) {
    try{
      const { email, username, password, isAdmin } = userData;
      const passwordString = password.toString();
      const hashedPassword = await bcrypt.hash(passwordString, 11);
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

  async getUser(userId){
    try{
      return await User.findByPk(userId);
    }catch(error){
      throw error;
    }
  },
  
  async loginUser(userData) {
    try{
      const { email, password } = userData;
      const user = await User.findOne({ 
        where: { email } 
      });

      if (!user) {
        return { error: "User not found" };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return { error: "Invalid password" };
      }

      return user;
    }catch(error){
      throw error;
    }
  },

}

module.exports = UsersRepo;