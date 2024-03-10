const ItemRepo = require("../repositories/itemsRepository");

async function getItems(req, res) {
  const items = await ItemRepo.getItems();
  return res.json({ items });
}

async function createItem(request, response, next) {
  try{
    const item = await ItemRepo.createItem(request.body);
    response.status(200).json({ data: item });
  }catch(error){
    next(error);
  }
}

module.exports = {
  getItems,
  createItem,
};