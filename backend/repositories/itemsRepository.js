const db = require("../models");
const { DataTypes } = require('sequelize');
// const sequelize = require('./path/to/sequelize/instance');

const Item = db.Item;

const ItemRepo = {
  // async getItems() {
  //   return [
  //     {
  //       id: 1,
  //       name: "Cappuccino",
  //       price: 3.5,
  //       image: "cappuccino.png",
  //     },
  //     {
  //       id: 2,
  //       name: "Latte",
  //       price: 3.5,
  //       image: "latte.png",
  //     },
  //     {
  //       id: 3,
  //       name: "Espresso",
  //       price: 2.5,
  //       image: "espresso.png",
  //     },
  //     {
  //       id: 4,
  //       name: "Mocha",
  //       price: 4.0,
  //       image: "mocha.png",
  //     },
  //     {
  //       id: 5,
  //       name: "Macchiato",
  //       price: 3.0,
  //       image: "macchiato.png",
  //     },
  //     {
  //       id: 6,
  //       name: "Chai Latte",
  //       price: 4.5,
  //       image: "chailatte.png",
  //     },
  //   ];
  // },



  async createItem(itemData) {
    try {
      const { name, description, price, image } = itemData;
      // const image = imageToBase64(imagePath);

      const item = await Item.create({
        item_name: name,
        image,
        description,
        price,
      });
      return await item.save();
    } catch (error) {
      throw error;
    }
  },

  async getItem(itemId){
    return await Item.findByPk(itemId);
  }
}

module.exports = ItemRepo;