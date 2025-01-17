const express=require("express");
const {getCatagories,addCategory,deleteCategory,UdateCategoryName}=require("../controllers/category.controller");
const router=express.Router();
const auth=require("../util/auth");

router.get('/',getCatagories);
router.post('/',auth.authMw,addCategory);
router.put('/:categoryId',auth.authMw,UdateCategoryName);
router.delete('/:categoryId',auth.authMw,deleteCategory)


module.exports=router 