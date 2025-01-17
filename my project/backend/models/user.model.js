const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
            trim:true
        },
        secondName:{
            type:String,
            trim:true,
            required:true
        },
        email:{
            type:String,
            unique:true,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
        userType:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'userType',
            require:true
        }
    },
    {
        timestamps:true,
    }
);
module.exports=mongoose.model('user',UserSchema);