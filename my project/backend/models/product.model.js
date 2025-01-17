const mongoose=require("mongoose");

const ProductSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            trim:true,
            required:true,
        },
        description:{
            type:String,
            trim:true,
            required:true,
        },
        price:{
            type:Number,
            required:true,
            min: 0,
        },
        color:String,
        size:{
            type:String,
            required:true,
            enum: ['S', 'M', 'L', 'XL', 'XXL'],
        },
        brand:{
            type:String,
            trim:true,
            required:true
        },
        isInStock:{//
            type:Boolean,
            default: true,
        },
        isActive:{ //it's flag to know if the product is deleted so don't display it 
            type:Boolean,
            default: true,
        },
        amount:{
            type:Number,
            min: 0,
        },
        imageUrl:{
            type:String,
            required:true
        },
        pinToHome:{
            type:Boolean,
            default:false,
        },
        subcategory:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'subcategory',
            required:true,
        },
        category:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'category',
            required:true,
        }
        
    },
    {
        timestamps:true,
    }
);
module.exports=mongoose.model('product',ProductSchema);