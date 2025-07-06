require('dotenv').config();

const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const db = process.env.MONGO_URL;
console.log('db' , db)

mongoose
  .connect(db)
  .then(() => {
    console.log("✅ MongoDB connected");
    // app.listen(PORT, () => {
    //   console.log(`🚀 Server is running on port ${PORT}`);
    // });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

app.listen(PORT ,() => {
  console.log(`Server is Running ${PORT}`);
});
