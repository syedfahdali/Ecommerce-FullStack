import express from "express";
import dotenv from "dotenv";
import {connectDB} from './config/db.js'
import productRoutes from "./routes/product.route.js"
dotenv.config();
const app = express();

app.use(express.json());//allows us to use json data in req.body
app.use("/api/products", productRoutes)
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    connectDB();
    console.log("Server started at http://localhost:"+PORT);
     
})
