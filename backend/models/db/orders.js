
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  orderType: {
    type: String,
    required: true
  },
  orderTable: {
    type: int,
    required: true
  },
  // Add more fields as needed

  // Define any additional options for the schema
  // For example, you can specify collection name, timestamps, etc.
}, { collection: 'orders', timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
