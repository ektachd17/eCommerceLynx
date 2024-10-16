const express = require('express');
const sequelize = require("./config/database");
require('dotenv').config();
const app = express();
const PORT = process.env.APPLICATION_PORT;


const productRouter = require("./routes/product");

app.use("/", productRouter);


app.use(express.json());



sequelize.sync()
  .then(() => {
    console.log("Database connection established...");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database cannot be connected!!",error);
  });