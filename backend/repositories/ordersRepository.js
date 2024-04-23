const db = require("../models");
const { DataTypes } = require('sequelize');

const Order = db.Order;
const Item = db.Item;

const OrdersRepo = {
  async addItem(itemId) {
    const item = await Item.findOne({
      where: {
        id: itemId,
      }
    });
// MAKE A COLUMN FOR ORDER WHERE ITS CALLED: BEING CREATED OR PENDING OR STH TO SIGNIFY AN ORDER BEING MADE RN.
    if (!item) return; 

    const order = await Order.findOne({
      where:{
        isFinished: false,
      }
    });
    if (!order) {
      await Order.create({
        // order_date: 
      });
    }


  },
  
}

module.exports = OrdersRepo;