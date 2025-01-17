const productModel=require("../models/product.model");

const addProduct=async(req,res)=>{
    try{
        req.body.imageUrl=req.file.filename;
        console.log(req.body);
        const product=await productModel.create(req.body);
        res.status(201).json({status:"success",message:"A new product is created successfully.",data:product});
    }
    catch(err){
        res.status(500).json({error:err.message});
    }

}
// for admin
const getProductsAdmin=async(req,res)=>{
    try{
        
        const products=await productModel.find();
        res.status(200).json({status:"success",message:"returns all the products of the website.",data:products})
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}
//for user
const getProducts=async(req,res)=>{
    try{
        
        const products=await productModel.find({isActive:true}).populate("category").populate("subcategory");
        res.status(200).json({status:"success",message:"returns all the products of the website.",data:products})
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}
const getProductsOfCategory=async(req,res)=>{
    try{
        const categoryId=req.params.categoryId;
        const products=await productModel.find({category:categoryId}).populate("category").populate("subcategory");

        res.status(200).json({status:"success",message:"returns all the products of a category.",data:products})
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}
const getProductsOfCategorySubCategory=async(req,res)=>{
    try{
        const categoryId=req.params.categoryId;
        const subcategoryId=req.params.subcategoryId;
        const products=await productModel.find({category:categoryId,subcategory:subcategoryId,isActive:true});
        res.status(200).json({status:"success",message:"returns all the products of  category and subcategory .",data:products});
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}
const pinToHome=async(req,res)=>{
    try{
        const productId=req.params.productId;
        const product=await productModel.findByIdAndUpdate(productId,{pinToHome:true});
        res.status(200).json({status:"success",message:"Product has been pinned to home .",data:product});
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}
const getProduct=async(req,res)=>{
    try{
        const productId=req.params.productId;
        console.log(productId)
        const product=await productModel.findById(productId).populate('category subcategory');
        res.status(200).json({status:"success",message:"returns a product.",data:product})
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}
// Fetch products
const getAllProducts= async (req, res) => {
    try {
      const products = await productModel.find({ isActive: true }).populate('subcategory category');
      res.status(200).json({status:"success",message:"returns  all products.",data:products})
    } catch (error) {
      res.status(500).send('Server error');
    }
  };
  
  // Delete product
  const deleteProduct=async (req, res) => {
    try {
      const product = await productModel.findByIdAndUpdate(req.params.id, { isActive: false });
      if (!product) {
        return res.status(404).send('Product not found');
      }
      res.json({ message: 'Product deleted' });
    } catch (error) {
      res.status(500).send('Server error');
    }
  };
  const updateProduct= async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      const updateData = req.body;
      console.log(req.body);
      if (req.file) {
        updateData.imageUrl = req.file.path;
      }
  
      const updatedProduct = await productModel.findByIdAndUpdate(id, updateData, {
        new: true, 
      });
  
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({
        message: 'Product updated successfully',
        data: updatedProduct,
      });
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ message: 'Failed to update product', error: error.message });
    }
  }
module.exports={
    addProduct,
    getProducts,
    getProductsOfCategory,
    getProductsOfCategorySubCategory,
    pinToHome,
    getProduct,
    getAllProducts,
    deleteProduct,
    updateProduct
}