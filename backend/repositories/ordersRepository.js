const db = require("../models");
const { DataTypes, or } = require('sequelize');

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
        isTaken: true,  
        confirmation_code: Math.floor(Math.random() * 1000000),
        user_id: userId,
      });

      // Go through eaaach item in orderItems 
      for (let itemId of orderItems) {
        // get teh Item with the id
        const item = await Item.findOne({
          where: {
            id: itemId,
          }
        });
        // if no item, return
        if (!item) {
          throw new Error(`Item with id ${itemId} not found`);
        }

        // check if theres similar order item
        const similarOrderItem = await OrderItem.findOne({
          where: {
            order_id: order.id,
            item_id: itemId,
          }
        });

        // logic to join the similar ones
        if (similarOrderItem) {
          similarOrderItem.item_quantity += 1;
          await similarOrderItem.save();
          if(item.amount > 0 && item.amount !== null) {
            item.set({
              amount: item.amount - 1,
            });
          }else if (item.amount === 0 && item.amount !== null) {
            throw new Error(`Item with id ${itemId} is out of stock`);
          }
          await item.save();
          continue;
        }

        // create a new order item
        const orderItem = await OrderItem.create({
          order_id: order.id,
          item_id: itemId,
          item_quantity: 1,
        });

        // remove the amount of the item by one
        if(item.amount > 0 && item.amount !== null) {
          item.set({
            amount: item.amount - 1,
          });
        }else if (item.amount === 0 && item.amount !== null) {
          throw new Error(`Item with id ${itemId} is out of stock`);
        }

        await item.save();
        await orderItem.save();
      }

      return await order.save();
    } catch (error) {
      throw error;
    }
  },

  async createOrder(orderItems, totalCost, userId, scheduleDate) {
    try {
      const order = await Order.create({
        order_date: scheduleDate,
        total_cost: totalCost,
        isFinished: false,
        isTaken: false,  
        confirmation_code: Math.floor(Math.random() * 1000000),
        user_id: userId,
      });

      // Go through eaaach item in orderItems 
      for (let itemId of orderItems) {
        // get teh Item with the id
        const item = await Item.findOne({
          where: {
            id: itemId,
          }
        });
        // if no item, return
        if (!item) {
          throw new Error(`Item with id ${itemId} not found`);
        }

        // check if theres similar order item
        const similarOrderItem = await OrderItem.findOne({
          where: {
            order_id: order.id,
            item_id: itemId,
          }
        });

        // logic to join the similar ones
        if (similarOrderItem) {
          similarOrderItem.item_quantity += 1;
          await similarOrderItem.save();
          if(item.amount > 0 && item.amount !== null) {
            item.set({
              amount: item.amount - 1,
            });
          }else if (item.amount === 0 && item.amount !== null) {
            throw new Error(`Item with id ${itemId} is out of stock`);
          }
          await item.save();
          continue;
        }

        // create a new order item
        const orderItem = await OrderItem.create({
          order_id: order.id,
          item_id: itemId,
          item_quantity: 1,
        });

        // remove the amount of the item by one
        if(item.amount > 0 && item.amount !== null) {
          item.set({
            amount: item.amount - 1,
          });
        }else if (item.amount === 0 && item.amount !== null) {
          throw new Error(`Item with id ${itemId} is out of stock`);
        }

        await item.save();
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
        return await Order.findAll({
          where: {
            user_id: id,
          }
        });
      }else {
        return await Order.findAll({
          where: {
            user_id: id,
          }
        });
      }
    }catch(error){
      throw error;
    }
  },

  async getIncomingOrders(id) {
    try{
      const user = await User.findByPk(id);

      if(!user.isAdmin) return;
      const allOrders = await Order.findAll({
        where: {
          isFinished: false,
        }
      })
      
      return allOrders;
    }catch(error){
      throw error;
    }
  },

  async getOrderItems(orderId) {
    try {
      const orderItems = await OrderItem.findAll({
        where: {
          order_id: orderId,
        },
        attributes: ['id', 'order_id', 'item_id', 'item_quantity', 'note'], // Add 'id' here
      });

      const items = await Promise.all(orderItems.map(async (orderItem) => {
        const item = await Item.findByPk(orderItem.item_id);
        return {
          id: orderItem.id,
          item_quantity: orderItem.item_quantity,
          note: orderItem.note,
          item_name: item.item_name,
          item_description: item.description,
        };
      }));

      return items;
    } catch (error) {
      throw error;
    }
  },

  async setIsFinishedTrue(orderId) {
    try {
      const order = await Order.findByPk(orderId);
      
      if(!order) return;

      order.set({
        isFinished: true,
      });

      return await order.save();
    } catch (error) {
      throw error;
    }
  },

  async setIsTakenTrue(orderId) {
    try {
      const order = await Order.findByPk(orderId);
      
      if(!order) return;

      if (!order.isFinished) {
        throw new Error('Order is not finished yet');
      }

      if (order.isTaken) return;

      order.set({
        isTaken: true,
      });

      return await order.save();
    } catch (error) {
      throw error;
    }
  }

}

module.exports = OrdersRepo;