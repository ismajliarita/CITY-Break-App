const UsersRepo = require("../repositories/usersRepository");
const ItemsRepo = require("../repositories/itemsRepository");
const jwt = require('jsonwebtoken');
const HttpError = require("../util/httpError");


async function getItems(req, res, next) {
  try{
    const items = await ItemsRepo.getItems();
    res.status(200).json({ data: items });
  }catch(error){
    next(error);
  }
}

async function createItem(request, response, next) {
  try{
    const itemData = {
      ...request.body,
      image: request.file.buffer,
    };

    console.log("IMAGE IN CONTROLLER CREATE_ITEM: ", itemData.image);
    
    const item = await ItemsRepo.createItem(itemData);
    response.status(200).json({ data: item	 });
  }catch(error){
    next(error);
  }
}

async function updateItem(request, response, next) {
  try{
    const itemId = request.params.id;
    const userId = request.jwtUserId;

    const admin = await UsersRepo.getUser(userId);

    if (!admin || admin.isAdmin == false)
      return next(new HttpError("Not Authorised!", 403));
    const data = {
      ...request.body,
      image: request.file ? request.file.buffer : undefined,
    };
    console.log("IMAGE IN CONTROLLER UPDATE_ITEM: ", data.image);

    const item = await ItemsRepo.updateItem(itemId, data);

    response.status(200).json({ data: item });
  }catch(error){
    next(error);
  }
}

async function deleteItem(request, response, next) {
  try{
    const token = request.headers.authorization.split(" ")[1];
    const itemId = request.body.itemId;
    const adminId = request.jwtUserId;
    
    const admin = await UsersRepo.getUser(adminId);
    
    if (!admin || admin.isAdmin == false)
      return next(new HttpError("Not Authorised!", 403));
    const item = await ItemsRepo.deleteItem(itemId);

    response.status(200).json({ data: item });
  }catch(error){
    next(error);
  }
}

async function getItemImage(request, response, next) {
  try{
    const id = request.params.id;
    console.log(id);
    const item = await ItemsRepo.getItemImage(id);
    response.set('Content-Type', 'image/png');
    response.send(item.image);
  }catch(error){
    next(error);
  }
}

async function getItemById(request, response, next) {
  try{
    const id = request.params.id;
    const item = await ItemsRepo.getItemById(id);
    response.status(200).json({ data: item });
  }catch(error){
    next(error);
  }
}

async function subtractAmount(request, response, next) {
  try{
    const id = request.params.id;
    const item = await ItemsRepo.subtractAmount(id);

    response.status(200).json({ data: item });
  }catch(error){
    next(error);
  }
}

async function removeItemAmounts(request, response, next) {
  try{
    const orderItemsIds = request.body.orderItemsIds;
    const response = await ItemsRepo.removeItemAmounts(orderItemsIds);

    response.status(200).json({ data: response });
  }catch(error){
    next(error);
  }
}

module.exports = {
  getItems,
  createItem,
  getItemImage,
  getItemById,
  subtractAmount,
  removeItemAmounts,
  deleteItem,
  updateItem,
};