const db = require("../models");
const { DataTypes } = require('sequelize');

const Order = db.Order;
const User = db.User;
const Item = db.Item;
const OrderItem = db.OrderItem;

const OrdersRepo = {

  //-----------THIS GOT FIXED WITH LOCAL STORAGE----- 
  // async addItem(itemId) {
  //   const item = await Item.findOne({
  //     where: {
  //       id: itemId,
  //     }
  //   });
    
  //   if (!item) return; 

  //   const order = await Order.findOne({
  //     where:{
  //       isFinished: false,
  //     }
  //   });
  //   if (!order) {
  //     await Order.create({
  //       // order_date: 
  //     });
  //   }
  // },
  
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

  async createOrderAsAdmin(orderData, totalCost, userId) {
    try {
      const order = await Order.create({
        order_date: new Date(Date.now()),
        isFinished: true,
        total_cost: totalCost,
        user_id: userId,
      });
      
      for (let itemId of orderData) {
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
  }

}

module.exports = OrdersRepo;