const OrdersRepo = require("../repositories/ordersRepository");

// async function addItem(req, res, next) {
//   try{
//     const id = req.params.id;
//     const order = await OrdersRepo.addItem(id);
    
//     res.status(200).json({ data: order });
//   } catch(error){
//     next(error);
//   }
// }

async function getOrders(req, res, next) {
  try{
    const orders = await OrdersRepo.getOrders();
    res.status(200).json({ data: orders });
  }catch(error){
    next(error);
  }
}

async function createOrder(req, res, next) {
  try{
    const orderData = req.body.orderData;
    const totalCost = req.body.totalCost;
    const order = await OrdersRepo.createOrder(orderData, totalCost);

    res.status(200).json({ data: order });
  } catch(error){
    next(error);
  }
}

module.exports = {
  getOrders,
  createOrder,
}