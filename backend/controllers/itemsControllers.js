const database = require("../models/db");

async function getItems() {
    try {
        const items = await database.getItems();
    
        response.status(200).json({ data: visibility });
      } catch (error) {
        return next(error);
      }
}



module.exports = {
    
};
  