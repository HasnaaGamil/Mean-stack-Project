const subcategoryModel=require("../models/subcategory.model");
const categoryModel=require('../models/category.model')

// const addSubcategory=async(req,res)=>{
//     try{
        
//         const newSubcategory=await subcategoryModel.create(req.body);
//         res.status(201).json({status:"success",message:"A new subcategory has been created successfully",data:newSubcategory});
//     }
//     catch(error){
//         res.status(500).json({error:error.message});
//     }

// }
const addSubcategory=async(req,res)=>{
    try{
      
        const subcategory=await  subcategoryModel.findOne(req.body);
        let newSubcategory;
        if(subcategory){
            newSubcategory=await subcategoryModel.findOneAndUpdate(req.body,{isActive:true},{new:true});
        }
        else{
            console.log(req.body);
            newSubcategory=await subcategoryModel.create(req.body);
        }
        res.status(201).json({status:"success",message:"A new subcategory has been created successfully.",data:newSubcategory});
    
        
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}

const getSubcategories=async(req,res)=>{
    try{
        const subcategories=await subcategoryModel.find({isActive:true}).populate("category");
        res.status(200).json({status:"success",message:"returns all the subcategories of the website",data:subcategories});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }

}

const getSubcategoriesUnderCategory=async(req,res)=>{
    try{
        const categoryId=req.params.category;
        // const category=await categoryModel.findOne({name:categoryName});
        
        const subcategories=await subcategoryModel.find({category:categoryId,isActive:true}).populate("category");
        res.status(200).json({status:"success",message:"returns all the subcategories of a category",data:subcategories});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }

}
const UpdateSubategoryName=async(req,res)=>{
    try{

        const subcategoryId=req.params.subcategoryId;
        
        const request=req.body;
        const updatedSubcategory=await subcategoryModel.findByIdAndUpdate(subcategoryId,request,{new :true});
       
        res.status(200).json({status:"success",message:"A  subcategory has been edited successfully",data:updatedSubcategory});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
    
}
const deleteSubcategory=async(req,res)=>{
    try{
        const subcategoryId=req.params.subcategoryId;
        const deletedSubcategory=await subcategoryModel.findByIdAndUpdate(subcategoryId,{isActive:false});
        res.status(200).json({status:"success",message:"A  subcategory has been deleted successfully",data:deletedSubcategory});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
    
}


module.exports={
    addSubcategory,
    getSubcategories,
    getSubcategoriesUnderCategory,
    deleteSubcategory,
    UpdateSubategoryName
}