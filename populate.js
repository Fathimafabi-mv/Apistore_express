  require("dotenv").config();

  const connectDB=require("./Db/connect");
  const Products=require("./Models/Products");
  const jsonProducts=require("./product.json")

  const start=async(req,res)=>{
    try{
        await connectDB(process.env.MONGO_URL);
        await Products.deleteMany();
        await Products.create(jsonProducts);
        console.log("success");
        process.exit(0);
    }catch(error){
        console.log(error);
        process.exit(1);
        
    }
  };

  start();