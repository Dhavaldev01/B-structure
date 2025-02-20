const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const { asyncHandler } = require("../Helpers/asyncHandler");
const User = require("../model/userModel");
const customError = require('../Helpers/customError');


exports.CreateUser = asyncHandler(async (req, res , next) => {
    const { firstname, lastname, username, email, age, address, password } =
      req.body;

    if (
      !firstname ||
      !lastname ||
      !username ||
      !email ||
      !age ||
      !address ||
      !password
    ) {
      return next(new customError("All Filed Are Required",400)) ;
    }

    const Uservalidate = await User.findOne({ username, email });

    if (Uservalidate) {
      return next(new customError("User is AllRedy Present",400)) ;
    }

    const HashPassword = await bcrypt.hash(password, 10);

    const CreatUser = await User.create({
      firstname,
      lastname,
      username,
      email,
      age,
      address,
      password: HashPassword,
    });

    if (!CreatUser) {
      return next(new customError("User Not Create ! Please Try Again",400)) ;
    }
    
    return res.status(201).json({
      success: true,
      message: "User Create Succefully",
    });
});


exports.LoginUser = asyncHandler(async (req, res , next) => {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return next(new customError("All Files Are Required",400));
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return next(new customError("User Are Not Exist Please First Register User",400));
      }
  
      const Checkpassword = await bcrypt.compare(password, user.password);
  
      if (!Checkpassword) {
        return next(new customError("Invalid Password",400));
      }
  
      const accessToken = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "5d" }
      );
  
     return res.status(201).json({
        success: true,
        message: "User are Succefully Login",
        accessToken,
      });
   
  })

exports.GetAllUser = asyncHandler(async (req, res , next) => {
    
      const AllUser = await User.find({});
  
      if (AllUser?.length > 0) {
       return  res.status(200).json({
          success: true,
          message: "List of User fetched successfully",
          data: AllUser,
        });

      } else {
      return next(new customError("No User Data Found",400)) ;
      }

  });

exports.GetSingleUser = asyncHandler(async (req, res,next) => { 
      const UserId = req.params.id;
  
      const user = await User.findById(UserId);
  
      if (!user) {
      return next(new customError("User This Id Will Be not Found ",400)) ;
      }
  
      return res.status(201).json({
        success: true,
        data: user,
      });

  });

exports.UpdateUserDetails = asyncHandler(async(req ,res , next) => {
    
      const UpadtedUserId = req.params.id;
      const UpadtedUserData = req.body;
    
      const Upadteduser = await User.findByIdAndUpdate(UpadtedUserId , UpadtedUserData ,{
        new : true
      })
      
      // const HashPassword = await bcrypt.hash(password, 10);
    
     
      if(!Upadteduser){
      return next(new customError("User with the current Id is not found!",400)) ;
    }
    
    return res.status(200).json({
        success : true,
        message : "User updated successfully",
        data : Upadteduser
    })
    });

exports.DeleteUser = asyncHandler(async(req, res , next) => {
  
      const DeleteUserId = req.params.id;
  
      const DeleteUser = await User.findByIdAndDelete(DeleteUserId);
  
      if(!DeleteUser){
      return next(new customError("User with the current Id is not found! Please try with a different Id",400)) ;
    }
  
    return res.status(201).json({
      success : true,
      data : DeleteUser
    })
  });