const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api', (req, res) => {
  return res.json({ "items" : ["item1", "item2", "item3", "item4"] });
});


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