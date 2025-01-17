const express=require('express');
const userRouter=express.Router();
const userController=require('../controllers/user.controller');
const auth=require("../util/auth");

userRouter.post("/",userController.createUser);
userRouter.get("/",auth.authMw,userController.getUsers);
// userRouter.get("/",userController.getUser);
userRouter.post("/login",userController.login);
module.exports=userRouter;