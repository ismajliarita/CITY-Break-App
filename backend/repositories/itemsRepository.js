const db = require("../models");
const { DataTypes } = require('sequelize');
// const sequelize = require('./path/to/sequelize/instance');

const Item = db.Item;

const ItemsRepo = {

  async getItems() {
    try{
      return await Item.findAll({
        attributes: ['id', 'item_name', 'price', 'description', 'amount'],
      });
    } catch(error){
      throw error;
    }
  },

  async createItem(itemData) {
    try {
      const { name, description, price, image, amount } = itemData;

      const item = await Item.create({
        item_name: name,
        image,
        description,
        price,
        amount
      });
      return await item.save();
    } catch (error) {
      throw error;
    }
  },

  async getItemImage(itemId){
    return await Item.findByPk(itemId, {
      attributes: ['image'],
    });
  },
  
  async getItemById(itemId){
    return await Item.findByPk(itemId, {
      attributes: ['id', 'item_name', 'price', 'description', 'amount'],
    });
  },

  async subtractAmount(itemId){
    try{
      const item = await Item.findByPk(itemId);

      if (!item) return;

      if (item.amount <= 1){
        item.set({
          amount: 0
        });
      }else{
        item.set({
          amount: item.amount-1
        })
      }

      return await item.save();
    }catch(error){
      throw error;
    }
  },

}

module.exports = ItemsRepo;