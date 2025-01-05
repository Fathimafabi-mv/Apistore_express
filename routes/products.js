const { getAllProducts, getAllProductStatic } = require("../controllers/product");

const express=require("express");

const router=express.Router()

router.route("/").get(getAllProducts);
router.route("/static").get(getAllProductStatic);

module.exports=router;