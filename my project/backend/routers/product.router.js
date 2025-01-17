const upload = require("../config/multerConfig");
const {addProduct,getProducts,getProductsOfCategory,getProductsOfCategorySubCategory,pinToHome,getProduct,getAllProducts,deleteProduct,updateProduct}=require("../controllers/product.controller");
const express=require("express");
const router=express.Router();
const auth=require("../util/auth");

router.post("/",auth.authMw,upload.single("productImage"),addProduct);
// router.put("/:productId",getProduct);
router.put("/:id",auth.authMw,upload.single("productImage"),updateProduct)
router.get("/",getProducts);
router.get("/admin",auth.authMw,getAllProducts);
router.get("/category/:categoryId",getProductsOfCategory);
router.get("/:productId",getProduct);
router.get("/:categoryId/:subcategoryId",getProductsOfCategorySubCategory);
router.delete("/admin/:id",auth.authMw,deleteProduct)
module.exports=router;