const OrdersRepo = require("../repositories/ordersRepository");

async function getFinishedOrders(req, res, next) {
  try{
    const id = req.jwtUserId;
    const orders = await OrdersRepo.getFinishedOrders(id);
    res.status(200).json({ data: orders });
  }catch(error){
    next(error);
  }
}

async function createOrderAsAdmin(req, res, next) {
  try{
    const orderItems = req.body.orderItems;
    const totalCost = req.body.totalCost;
    const userId = req.jwtUserId;
    
    const order = await OrdersRepo.createOrderAsAdmin(orderItems, totalCost, userId);


    res.status(200).json({ data: order });
  } catch(error){
    next(error);
  }
}

async function createOrder(req, res, next) {
  try{
    const orderItems = req.body.orderItems;
    const totalCost = req.body.totalCost;
    const scheduleDate = req.body.scheduleDate;
    const userId = req.jwtUserId;
    
    const order = await OrdersRepo.createOrder(orderItems, totalCost, userId, scheduleDate);

    res.status(200).json({ data: order });
  } catch(error){
    next(error);
  }
}

async function getOrders(req, res, next) {
  try{
    const id = req.jwtUserId;
    const orders = await OrdersRepo.getOrders(id);
    res.status(200).json({ data: orders });
  }catch(error){
    next(error);
  }
}

async function getIncomingOrders(req, res, next) {
  try{
    const id = req.jwtUserId;

    const orders = await OrdersRepo.getIncomingOrders(id);

    res.status(200).json({ data: orders });
  }catch(error){
    next(error);
  }
}

async function getOrderItems(req, res, next) {
  try{
    const id = req.params.id;
    const orderItems = await OrdersRepo.getOrderItems(id);
    res.status(200).json({ data: orderItems });
  }catch(error){
    next(error);
  }
}

async function setIsFinishedTrue(req, res, next) {
  try{
    const id = req.params.id;
    await OrdersRepo.setIsFinishedTrue(id);
    res.status(200).json({ message: "Order is finished" });
  }catch(error){
    next(error);
  }
}

async function setIsTakenTrue(req, res, next) {
  try{
    const id = req.params.id;
    await OrdersRepo.setIsTakenTrue(id);
    res.status(200).json({ message: "Order is taken" });
  }catch(error){
    next(error);
  }
}

module.exports = {
  getFinishedOrders,
  createOrderAsAdmin,
  createOrder,
  getOrders,
  getIncomingOrders,
  getOrderItems,
  setIsFinishedTrue,
  setIsTakenTrue,
}