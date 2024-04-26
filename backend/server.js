const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const apiRouter = express.Router();

const itemsRoutes = require('./routes/itemsRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const usersRoutes = require('./routes/usersRoutes');

app.use(cors());


apiRouter.use('/items', itemsRoutes);
apiRouter.use('/orders', ordersRoutes);
apiRouter.use('/users', usersRoutes);

app.use(express.json());
app.use("/api", apiRouter);




app.listen(8081, () => {
  console.log("Server is running on port 8081");
});