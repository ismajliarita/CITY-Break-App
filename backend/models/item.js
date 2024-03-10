"use strict";
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {}

  Item.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      item_name: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      image:{
        type: DataTypes.BLOB,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
