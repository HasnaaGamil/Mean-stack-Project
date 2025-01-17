const categoryModel=require("../models/category.model");

const addCategory=async(req,res)=>{
    try{
      
        const category=await  categoryModel.findOne(req.body);
        let newCategory;
        if(category){
             newCategory=await categoryModel.findOneAndUpdate(req.body,{isActive:true},{new:true});
        }
        else{
            console.log(req.body);
             newCategory=await categoryModel.create(req.body);
        }
        res.status(201).json({status:"success",message:"A new category has been created successfully.",data:newCategory});
    
        
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}
//returns all the categories of the website
const getCatagories=async(req,res)=>{
    try{
        
        const catagories=await categoryModel.find({isActive:true});
        res.status(201).json({status:"success",message:"returns all the categories of the website",data:catagories});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
    
}
const UdateCategoryName=async(req,res)=>{
    try{
        const categoryId=req.params.categoryId;
        const request=req.body;
        const updatedCategory=await categoryModel.findByIdAndUpdate(categoryId,request,{new :true});
        res.status(200).json({status:"success",message:"A  category has been edited successfully",data:updatedCategory});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
    
}
const deleteCategory=async(req,res)=>{
    try{
        const categoryId=req.params.categoryId;
        const deletedCategory=await categoryModel.findByIdAndUpdate(categoryId,{isActive:false});
        res.status(200).json({status:"success",message:"A  category has been deleted successfully",data:deletedCategory});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
    
}
module.exports={
    addCategory,
    getCatagories,
    deleteCategory,
    UdateCategoryName
}