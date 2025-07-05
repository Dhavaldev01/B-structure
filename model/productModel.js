// // const mongoose = require("mongoose");

// // const ProductSchema = new mongoose.Schema(
// //   {
// //     userId: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //       required: true
// //     },
// //     title: {
// //       type: String,
// //       required: true,
// //       trim: true,
// //     },
// //     description: {
// //       type: String,
// //       required: true,
// //       trim: true,
// //     },
// //     category: {
// //       type: String,
// //       required: true,
// //       trim: true,
// //     },
// //     price: {
// //       type: Number,
// //       required: true,
// //     },
// //     photo: {
// //       type: String,
// //       required: true,
// //     }
// //   },
// //   {
// //     timestamps: true,
// //   }
// // );

// // const Product = mongoose.model("Product", ProductSchema);
// // module.exports = Product;


// const mongoose = require("mongoose");

// const OrderSchema = new mongoose.Schema(
//   {
//     orderId: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     productName: {
//       type: String,
//       required: true,
//     },
//     callStatus: {
//       type: String,
//       enum: ["Call received", "Call not received"],
//       required: true,
//     },
//     paymentType: {
//       type: String,
//       enum: ["COD", "Online"], // 'None' for no payment
//       required: true,
//     },
//       payment: {
//       type: String,
//       enum: ["YES", "NO"], // 'None' for no payment
//       required: true,
//     },
//     paymentAmount: {
//       type: Number,
//       default: 0,
//     },
//     fulfillmentStatus: {
//       type: String,
//       enum: ["Fulfilled", "Unfulfilled"],
//       required: true,
//     },
//     customerName: {
//       type: String,
//       required: true,
//     },
//     deliveryStatus: {
//       type: String,
//       enum: ["Delivered", "Pending"],
//       required: true,
//     },
//     returnStatus : {
//       type : String ,
//       enum : ["YES" , "NO"],
//       required : true
//     }
//   },
//   {
//     timestamps: true,
//   }
// );

// const Product = mongoose.model("Order", OrderSchema);
// module.exports = Product;
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    productName: {
      type: String,
      required: true,
    },
    callStatus: {
      type: String,
      enum: ["Call received", "Call not received"],
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["COD", "Online"],
      required: true,
    },
    payment: {
      type: String,
      enum: ["YES", "NO"],
      required: true,
    },
    paymentAmount: {
      type: Number,
      default: 0,
    },
    fulfillmentStatus: {
      type: String,
      enum: ["Fulfilled", "Unfulfilled"],
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    deliveryStatus: {
      type: String,
      enum: ["Delivered", "Pending"],
      required: true,
    },
    returnStatus: {
      type: String,
      enum: ["YES", "NO"],
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Order", OrderSchema);
module.exports = Product;
