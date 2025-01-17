const express=require("express");
const connectDB=require("./config/DB.config");
const cors=require("cors");

const categoryRouter=require("./routers/category.router");
const subcategoryRouter=require("./routers/subcategory.router");
const productRouter=require("./routers/product.router");
const userTypeRouter=require("./routers/userType.router");
const userRouter=require("./routers/user.router");
const orderRouter=require("./routers/order.router");


const port=5000;
const app=express();

app.use(cors(
    {
        origin:'http://localhost:4200'
    }
));

//connect to database
connectDB();
//to exchange data with json
app.use(express.json());
app.use("/images",express.static("./images"))

app.use("/category",categoryRouter);
app.use("/subcategory",subcategoryRouter);
app.use("/product",productRouter);
app.use("/userType",userTypeRouter);
app.use("/user",userRouter);
app.use("/order",orderRouter);


app.listen(port,()=>{
    console.log(`Server is running on port number ${port}.`);
})
