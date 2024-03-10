import database from "../models";

const Item = database.item;

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


  async createItem(item) {
    return await Item.create(
      {
        item_name: item.name,
        image: item.image,
        description: item.description,
        price: item.price,
      }
    );
  }
}

module.exports = ItemRepo;