const db = require("../models");
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const { getDateAfterHours } = require("../util/helpers");

const Order = db.Order;
const Item = db.Item;
const User = db.User;

const UsersRepo = {
  async verifyEmail(verificationCode) {
    try{
      const user = await User.findOne({ 
        where: { verificationCode } 
      });

      if (!user) return {error: "Invalid Verification Code"};
      if (user.isVerified) return {error: "User is already verified"};
      

      user.isVerified = true;
      await user.save();
      return user;
    }catch(error){
      throw error;
    }
  },

  async getUserByEmail(email) {
    try{
      return await User.findOne({
        where: { email }
      });
    }catch(error){
      throw error;
    }
  },

  async createUser(userData) {
    try{
      const { email, username, password, verificationCode } = userData;
      
      const user = await UsersRepo.getUserByEmail(email);
      if (user) { 
        if(!user.isVerified){
          user.verificationCode = verificationCode;
          user.verificationTokenExpiry = getDateAfterHours(24);
          await user.save();
          return {error: "User already exists but not verified"};
        }
      };

      const passwordString = password.toString();
      const hashedPassword = await bcrypt.hash(passwordString, 11);
      return await User.create({
        email,
        username,
        password: hashedPassword,
        isAdmin: false,
        isVerified: false,
        verificationCode,
        verificationTokenExpiry: getDateAfterHours(24),
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

      if (!user.isVerified) {
        return { error: "User is not verified" };
      }

      return user;
    }catch(error){
      throw error;
    }
  },

  async getAllUsers() {
    try{
      return await User.findAll();
    }catch(error){
      throw error;
    }
  },

  async deleteUser(userId) {
    try{
      return await User.destroy({
        where: { id: userId }
      });
    }catch(error){
      throw error;
    }
  },

  async changeUsername(userId, newUsername) {
    try{
      const user = await User.findByPk(userId);
      user.username = newUsername;
      return await user.save();
    }catch(error){
      throw error;
    }
  },

  async changePassword(userId, oldPassword, newPassword) {
    try{
      const user = await User.findByPk(userId);
      
      if (!user) {
        return { error: "User not found" };
      }

      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

      if (!isPasswordValid) {
        return { error: "Invalid old password" };
      }

      
      const passwordString = newPassword.toString();
      const hashedPassword = await bcrypt.hash(passwordString, 11);

      user.password = hashedPassword;

      return await user.save();
    }catch(error){
      throw error;
    }
  },

}

module.exports = UsersRepo;