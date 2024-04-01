const ItemRepo = require("../repositories/itemsRepository");

async function getItems(req, res) {
  const items = await ItemRepo.getItems();
  return res.json({ items });
}

async function createItem(request, response, next) {
  try{
    // console.log(request.body, "  controller");
    const itemData = {
      ...request.body,
      image: request.file.buffer,
    };
    const item = await ItemRepo.createItem(itemData);
    response.status(200).json({ data: item	 });
  }catch(error){
    next(error);
  }
}

async function getItemImage(request, response, next) {
  try{
    const id = request.params.id;
    console.log(id);
    const item = await ItemRepo.getItem(id);
    response.set('Content-Type', 'image/png');
    response.send(item.image);
  }catch(error){
    next(error);
  }
}

module.exports = {
  getItems,
  createItem,
  getItemImage,
};