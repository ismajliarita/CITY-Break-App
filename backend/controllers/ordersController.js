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
    const orders = await OrdersRepo.getFinishedOrders();
    const id = req.params.id;
    res.status(200).json({ data: orders });
  }catch(error){
    next(error);
  }
}

async function createOrderAsAdmin(req, res, next) {
  try{
    const orderData = req.body.orderItemsIds;
    const totalCost = req.body.totalCost;
    
    const order = await OrdersRepo.createOrderAsAdmin(orderData, totalCost);


    res.status(200).json({ data: order });
  } catch(error){
    next(error);
  }
}

module.exports = {
  getFinishedOrders,
  createOrderAsAdmin,
}