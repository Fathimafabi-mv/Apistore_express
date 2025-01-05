const notFound=(req,res)=>
    res.status(404).send("Sorry requested route does not Exist");

module.exports=notFound;

