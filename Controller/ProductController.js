const customError = require("../Helpers/customError");
const { asyncHandler } = require("../Helpers/asyncHandler");
const Product = require("../model/productModel");



exports.CreateProduct = asyncHandler(async (req, res , next) => {

      const { title, description, category, price } = req.body;
    //   console.log(req.body, '=');
  
      if (!title || !description || !category || !price) {
      return next(new customError("All Filed Are Required"),400);
      }
  
      const userId = req.userInfo.userId;
    //   console.log("User id ", userId);

       const ProfileImage = req.file ? req.file.path : null ;
    //    console.log("Req.file" , req.file);
    //    console.log("ProfileImage " , ProfileImage);
  
      const CreateProduct = await Product.create({
        userId,
        title,
        description,
        category,
        price,
        photo : ProfileImage,
      });
      // await CreateProduct.save();
  
      if (CreateProduct) {
        return res.status(201).json({
          success: true,
          message: "Product Create Succefully",
          data: CreateProduct,
        });
      } else {
      return next(new customError("Product Not Create ! Please Try Again",400));
      }

  })

exports.GetAllProducts = asyncHandler(async (req, res , next) => {
      const AllProduct = await Product.find({});
  
      if (AllProduct?.length > 0) {
        return res.status(200).json({
          success: true,
          message: "List of Product fetched successfully",
          data: AllProduct,
        });
      } else {
      return next(new customError("No Product Data Found",400));
      }

  })


exports.GetSingleProduct = asyncHandler(async (req, res , next) => {
      const ProductId = req.params.id;
  
      const product = await Product.findById(ProductId);
  
      if (!product) {
      return next(new customError("Product This Id Will Be not Found ",400));
      }
  
      return res.status(201).json({
        success: true,
        data: product,
      });

  })

exports.UpdateProduct = asyncHandler(async (req, res , next) => {
      const UpadtedProductId = req.params.id;
      const UpadtedProductrData = req.body;
  
      const UpadtedProduct = await Product.findByIdAndUpdate(
        UpadtedProductId,
        UpadtedProductrData,
        {
          new: true,
        }
      );
  
      if (!UpadtedProduct) {
      return next(new customError("Product with the current Id is not found!",400));
      }
      
      return res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: UpadtedProduct,
      });
  })

exports.DeleteProduct = asyncHandler(async (req, res , next) => {

      const DeleteProductId = req.params.id;
  
      const DeleteProduct = await Product.findByIdAndDelete(DeleteProductId);
  
      if (!DeleteProduct) {
      return next(new customError("Product with the current Id is not found! Please try with a different Id",400));
      }
  
      return res.status(201).json({
        success: true,
        data: DeleteProduct,
      });

  })