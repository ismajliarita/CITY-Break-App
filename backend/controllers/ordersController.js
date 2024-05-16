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

async function getFinishedOrders(req, res, next) {
  try{
    const id = req.params.id;
    const orders = await OrdersRepo.getFinishedOrders(id);
    res.status(200).json({ data: orders });
  }catch(error){
    next(error);
  }
}

async function createOrderAsAdmin(req, res, next) {
  try{
    const orderData = req.body.orderItemsIds;
    const totalCost = req.body.totalCost;
    const userId = req.body.userId;
    
    const order = await OrdersRepo.createOrderAsAdmin(orderData, totalCost, userId);


    res.status(200).json({ data: order });
  } catch(error){
    next(error);
  }
}

module.exports = {
  getFinishedOrders,
  createOrderAsAdmin,
}