require("dotenv").config();
const mongoose = require("mongoose");
const Order = require("./model/productModel"); // Adjust the path if needed

const callStatusOptions = ["Call received", "Call not received"];
const paymentTypes = ["COD", "Online"];
const returnStatuses = ["YES", "NO"];
const paymentStatuses = ["YES", "NO"];
const fulfillmentStatuses = ["Fulfilled", "Unfulfilled"];
const deliveryStatuses = ["Delivered", "Pending"];
const productNames = ["Phone", "Laptop", "Shoes", "T-shirt", "Book"];
const customerNames = ["John", "Amit", "Ravi", "Priya", "Sara"];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const MONGO_URL = "mongodb://localhost:27017/test-shopifyw";

const generateOrders = (count = 70) => {
  const orders = [];

  for (let i = 1; i <= count; i++) {
    const paymentType = getRandom(paymentTypes);
    const paymentAmount = paymentType ? Math.floor(Math.random() * 5000) + 100 : 0;
    const payment = paymentAmount > 0 ? "YES" : "NO";

    orders.push({
      orderId: `ORD00${i}`,
      productName: getRandom(productNames),
      callStatus: getRandom(callStatusOptions),
      paymentType,
      payment,
      paymentAmount,
      fulfillmentStatus: getRandom(fulfillmentStatuses),
      customerName: getRandom(customerNames),
      deliveryStatus: getRandom(deliveryStatuses),
      returnStatus: getRandom(returnStatuses),
    });
  }

  return orders;
};

const seedOrders = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("🌿 Connected to DB");

    await Order.deleteMany({});
    console.log("🗑️ Existing Orders Deleted");

    const orders = generateOrders(70);
    await Order.insertMany(orders);
    console.log("✅ 70 Orders Seeded");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error Seeding Orders:", err);
    process.exit(1);
  }
};

seedOrders();
