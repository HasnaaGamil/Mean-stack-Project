const express=require('express');
const userTypeRouter=express.Router();
const userTypeController=require('../controllers/userType.controller');

userTypeRouter.post("/",userTypeController.createUserType);
userTypeRouter.get("/",userTypeController.getUsersType);

module.exports=userTypeRouter;
