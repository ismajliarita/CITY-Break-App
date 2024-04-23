const ItemsRepo = require("../repositories/itemsRepository");

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
    const item = await ItemsRepo.createItem(itemData);
    response.status(200).json({ data: item	 });
  }catch(error){
    next(error);
  }
}

async function getItemImage(request, response, next) {
  try{
    const id = request.params.id;
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

module.exports = {
  getItems,
  createItem,
  getItemImage,
  getItemById,
  subtractAmount,
};