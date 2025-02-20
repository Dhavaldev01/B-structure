const express = require('express');
const router = express.Router();

const UserController = require('../Controller/UserController.js')

router.post('/create',UserController.CreateUser);
router.post('/login',UserController.LoginUser);
router.get('/getalluser',UserController.GetAllUser);
router.get('/getsingleuser/:id',UserController.GetSingleUser);
router.put('/update/:id',UserController.UpdateUserDetails);
router.delete('/delete/:id',UserController.DeleteUser);







module.exports = router;