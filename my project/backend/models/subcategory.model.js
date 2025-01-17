const mongoose=require("mongoose");

const SubcategorySchema= new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true,
        },
        category:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'category',
            required:true
        },
        isActive:{
            type:Boolean,
            default:true
        }

    },
    {
        timestamps:true,
    }
);
module.exports=mongoose.model('subcategory',SubcategorySchema);