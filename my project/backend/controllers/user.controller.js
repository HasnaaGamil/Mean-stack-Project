const userModel=require("../models/user.model");
const hashed=require("../util/hashing");
const auth=require('../util/auth');
exports.createUser=async(req,res)=>{
    try{
        const password =req.body.password;
        req.body.password=await hashed.hashPassword(password);
        const user=await userModel.create(req.body);
        res.status(200).json({status:"success",data:user});
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}

exports.getUser=async(req,res)=>{
    try{
        const user=await userModel.findById(req.params.id);
        if(user){
            res.status(200).json({status:"success",data:user});
        }
        else
            res.status(404).json({status:"failed",message:"User not found"});
        
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}
exports.getUsers=async(req,res)=>{
    try{
        const user=await userModel.find().populate("userType","name");
        res.status(200).json({status:"success",data:user});
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}
exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await userModel.findOne({email}).populate('userType');
        if(user){
            if(await hashed.isMatch(password,user.password)){
                
                const token =auth.accessToken({userId:user._id,username:user.firstName,userType:user.userType.name})
                //access token
                res.status(202).json({status:"success",data:user,message:"logged in successfuLly",accessToken:token});
            }
            else{
                res.status(404).json({status:"failed",message:"failed to login"});
            }
        }
        else
            res.status(404).json({status:"failed",message:"failed to login"});

    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}
