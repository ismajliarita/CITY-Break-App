const OrdersRepo = require("../repositories/ordersRepository");

async function getOrders(req, res, next) {
  try{
    const orders = await OrdersRepo.getItems();
    res.status(200).json({ data: orders });
  }catch(error){
    next(error);
  }
}

async function addItem(req, res, next) {
  try{
    const id = req.params.id;
    const order = await OrdersRepo.addItem(id);

    res.status(200).json({ data: order });
  } catch(error){
    next(error);
  }
}


module.exports = {
  getOrders,
  addItem,
}