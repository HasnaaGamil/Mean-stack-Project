const userTypeModel=require('../models/userType.model');

exports.createUserType=async(req,res)=>{
    try{
        const userType=await userTypeModel.create(req.body);
        res.status(201).json({status:"success",data:userType});
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
    
}
// all users type
exports.getUsersType=async(req,res)=>{
    try{
        const userType =await userTypeModel.find();
        res.status(200).json({status:"success",data:userType});
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}