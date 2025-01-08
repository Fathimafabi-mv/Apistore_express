const express=require("express");
const app=express();
require("dotenv").config();
require("express-async-errors");
const notFoundmiddleware =require("./middleware/notfound");
const errorMiddleware=require("./middleware/errorHandler")
const connectDB = require("./Db/connect");
const productRouter=require("./routes/products")

app.use("/api/v1/products",productRouter)
app.use(errorMiddleware);
app.use(notFoundmiddleware);

const port=process.env.PORT || 3700;

const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URL)
        app.listen(port,console.log(`Server is listening at ${port}`));
        
    }catch(error){
        console.log(error);
        
    }
}

start();

