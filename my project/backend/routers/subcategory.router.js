const express=require("express");
const {addSubcategory,getSubcategories,getSubcategoriesUnderCategory,deleteSubcategory,UpdateSubategoryName}=require("../controllers/subcategory.controller");
const router=express.Router();
const auth=require("../util/auth");

router.post("",auth.authMw,addSubcategory);
router.get("",getSubcategories);
router.get("/:category",getSubcategoriesUnderCategory);
router.put('/:subcategoryId',auth.authMw,UpdateSubategoryName);
router.delete("/:subcategoryId",auth.authMw,deleteSubcategory)

module.exports=router;