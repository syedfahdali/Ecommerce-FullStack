import Product from "../models/product.model.js"
import mongoose from "mongoose";

export const getProducts = async (req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json({success:true,message:"All products retrieved",data:products})
    }
    catch(error){
        console.error("error in fetching products:",error.message);
        res.status(400).json({success:false,message:"failed to get products"})
    }
}

export const createProduct = async (req,res)=>{
    const product = req.body; //user is sending this data to mongodb
    if(!product.name || !product.price || !product.image){
        return res.statusCode(400).json({success:false, message:"Please provide all fields"});
    }
    const newProduct = new Product(product); // this Product is model in product.model.js
    try{
        await newProduct.save();
        res.status(201).json({success:true,data: newProduct});
    }catch(error){
        console.error("Error in Create Product:", error.message);
        res.status(500).json({success: false,message: "Server Error "})
    }

}
export const updateProduct = async (req,res)=>{
    const {id}= req.params;
    const product = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Invalid product id"})
    }
    try{
       const updatedProduct = await Product.findByIdAndUpdate(id,product,{new:true});
       res.status(200).json({success:true,body:updatedProduct,message:"Succesfully updated the product"}) 
    }
    catch(error){
        console.error("failed to update the product",error.message)
        res.status(500).json({success:false,message:"Server error"})
    }
}
export const deleteProduct = async (req,res)=>{
    const {id}= req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Invalid product id"})
    }
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true, message:"Product deleted"})
    }
    catch(error){
        res.status(500).json({success:false, message:"Product not found"})
    }
}