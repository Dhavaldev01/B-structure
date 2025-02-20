require('dotenv').config();

const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const db = process.env.MONGO_URL;

mongoose
  .connect(db, {
  })
  .then(() => {
    console.log("MongoDb Is Connected");
  })
  .catch((e) => {
    console.log(" Mongo Connect Error", e);
  });

app.listen(PORT ,() => {
  console.log(`Server is Running ${PORT}`);
});
