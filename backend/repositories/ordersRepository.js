const db = require("../models");
const { DataTypes } = require('sequelize');

const Order = db.Order;
const User = db.User;
const Item = db.Item;
const OrderItem = db.OrderItem;

const OrdersRepo = {

  async getFinishedOrders(id) {
    try{
      const user = await User.findByPk(id);

      if (user.isAdmin) {
        return await Order.findAll({
          where: {
            isFinished: true,
          }
        });
      }else {
        return await Order.findAll({
          where: {
            isFinished: true,
            user_id: id,
          }
        });
      }
    } catch(error){
      throw error;
    }
  },

  async createOrderAsAdmin(orderItems, totalCost, userId) {
    try {
      const order = await Order.create({
        order_date: new Date(Date.now()),
        total_cost: totalCost,
        isFinished: true,
        confirmation_code: Math.floor(Math.random() * 1000000),
        user_id: userId,
      });
      
      for (let itemId of orderItems) {
        const item = await Item.findOne({
          where: {
            id: itemId,
          }
        });

        if (!item) {
          throw new Error(`Item with id ${itemId} not found`);
        }

        const similarOrderItem = await OrderItem.findOne({
          where: {
            order_id: order.id,
            item_id: itemId,
          }
        });

        if (similarOrderItem) {
          similarOrderItem.item_quantity += 1;
          await similarOrderItem.save();
          continue;
        }

        const orderItem = await OrderItem.create({
          order_id: order.id,
          item_id: itemId,
          item_quantity: 1,
        });

        await orderItem.save();
      }

      return await order.save();
    } catch (error) {
      throw error;
    }
  },

  async createOrder(orderItems, totalCost, userId) {
    try {
      const order = await Order.create({
        order_date: new Date(Date.now()),
        total_cost: totalCost,
        isFinished: false,
        confirmation_code: Math.floor(Math.random() * 1000000),
        user_id: userId,
      });
      
      for (let item of orderItems) {
        const similarOrderItem = await OrderItem.findOne({
          where: {
            order_id: order.id,
            item_id: item.id,
            note: item.note,
          }
        });

        if (similarOrderItem) {
          similarOrderItem.item_quantity += 1;
          await similarOrderItem.save();
          continue;
        }

        const orderItem = await OrderItem.create({
          order_id: order.id,
          item_id: item.id,
          item_quantity: 1,
          note: item.note,
        });

        await orderItem.save();
      }

      return await order.save();
    } catch (error) {
      throw error;
    }
  },

  async getOrders(id) {
    try{
      const user = await User.findByPk(id);

      if (user.isAdmin) {
        return await Order.findAll();
      }else {
        return await Order.findAll({
          where: {
            user_id: id,
          }
        });
      }
    } catch(error){
      throw error;
    }
  }

}

module.exports = OrdersRepo;