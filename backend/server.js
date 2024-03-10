const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const apiRouter = express.Router();

const itemsRoutes = require('./routes/itemsRoutes');

app.use(cors());


apiRouter.use('/items', itemsRoutes);

app.use(bodyParser.json());
app.use("/api", apiRouter);


// app.get('/api', (req, res) => {
//   return res.json({ "items" : ["item1", "item2", "item3", "item4"] });
// });

// app.get('/api/items', (req, res) => {
//   return res.json({ "items" : ["item1", "item2", "item3", "item4"] });
// });


// const mysql = require('mysql');

// const app = express();

// const db = mysql.createConnection({
//   host: 'localhost:3310',
//   user: 'root',
//   password: '',
//   database: 'city_break_app'
// })

// app.get('/', (req, res) => {
//   return res.json("From Backend Side <3");
// });

// app.get('/item', (req, res) => {
//   db.query("SELECT * FROM item", (err, result) => {
//     if (err)  {
//       return res.json(err) 
//     }else{
//       return res.json(result);
//     }
//   })
// });


app.listen(8081, () => {
  console.log("Server is running on port 8081");
});