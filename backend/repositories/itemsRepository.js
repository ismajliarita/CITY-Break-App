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
      const item = await Item.create({
        item_name: itemData.name,
        image : itemData.image,
        description : itemData.description,
        price : itemData.price,
        amount : itemData.amount === 0 || itemData.amount === "" ? null : itemData.amount,
    });
      return await item.save();
    } catch (error) {
      throw error;
    }
  },

  async deleteItem(itemId) {
    try {
      const item = await Item.findByPk(itemId);
      if (!item) return;
      return await item.destroy();
    } catch (error) {
      throw error;
    }
  },

  async updateItem(itemId, itemData) {
    try {
      console.log("itemData: ", itemData);
      const item = await Item.findByPk(itemId);
      if (!item) return;
      item.set({
        item_name: itemData.name,
        description : itemData.description,
        price : itemData.price,
        amount : itemData.amount === 0 || itemData.amount === "" ? null : itemData.amount,
      });
      if (itemData.image) {
        item.set({
          image: itemData.image,
        });
      }
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

  async removeItemAmounts(orderItemsIds){
    try{
      for (let itemId of orderItemsIds){

        const item = await Item.findByPk(itemId);

        if (!item) continue;
        
        if (item.amount == NULL) {
          continue;
        }

        item.set({
          amount: amount-1
        });

        await item.save();
      }
    }catch(error){
      throw error;
    }
  },

}

module.exports = ItemsRepo;