const Products = require("../Models/Products");

const getAllProductStatic=async(req,res)=>{
 const product=await Products.find({}).select("name company ").limit(3).skip(1);
 res.status(200).json({product,nbHits:product.length});
}

const getAllProducts=async(req,res)=>{
    try{
        const queryObject={};
        const {featured,company,name,sort,fields}=req.query;
        if(featured){
            queryObject.featured = featured==="true"?true:false;
        } 
        if(company){
            queryObject.company=company;
        }
        if(name){
            queryObject.name={$regex:name,$options:"i"};
        }
        
        
     let result= Products.find(queryObject);
     let products={};

     if(sort){
        const sortList=sort.split(",").join(" ");
        products=result.sort(sortList);
        
     }else{
         result=result.sort("createdAt");
     }


     if(fields){
        const fieldList= fields.split(",").join(" ");
        result=result.select(fieldList);
       }
    
       const page=Number(req.query.page) ||1;
       const limit=Number(req.query.limit) || 10;
       const skip=(page-1)*limit;

       result=result.skip(skip).limit(limit);

      products=await result;
     res.status(200).json({products,nbHits:products.length}); 
    
    
    }catch(error){
      console.log(error);
      
    }
    
};

module.exports={getAllProductStatic,getAllProducts}
