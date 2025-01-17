const mongoose=require("mongoose");
const OrderSchema=new mongoose.Schema(
    {
        fullName:{
            type:String,
            trim:true,
            required:true
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'user',
            required:true
        },
        items:[{
            product:{type:mongoose.Schema.Types.ObjectId,
            ref:'product'},
            quantity: { type: Number, required: true },
        }],
        deliveryAddress:{
            type:String,
            trim:true,
            required:true
        },
        deliveryCity:{
            type:String,
            trim:true,
            required:true
        },
        phoneNumber:{
            type:String,
            trim:true,
            required:true
        },
        postalCode:{
            type:Number,
            required:true
        },
        paymentMethod:{
            type:String,
            trim:true,
            default:"Cash on Delivery"
        },
        deliveryFee:{
            type:Number,
            // required:true
        },
        totalPrice:{
            type:Number,
            // required:true
        },
        orderStatus:{
            type:String,
            required:true,
            enum: ['pending', 'inProgress', 'shipped', 'delivered', 'cancelled'],
            default:'pending'
        },
        estimatedDeliveryDate: {
            type: Date,
        },
    },
    {
        timestamps:true,
    }
);
module.exports=mongoose.model('order',OrderSchema);