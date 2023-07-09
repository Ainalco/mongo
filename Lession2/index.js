const express= require('express');
const mongoose = require("mongoose");
const app= express();
const PORT=3000;

//create schema for product
const productSchema = new mongoose.Schema({
  
    title:{
      type: String,
      reuire: true,
    },
    price: {
      type: Number,
      reuire: true,
    },
    rating: {
      type: Number,
      reuire: true,
    },
    description: {
      type: String,
      reuire: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  //Create model 
const Product = mongoose.model("Products",productSchema);

const connectionDB= async ()=>{
    try{
     await mongoose.connect('mongodb://127.0.0.1:27017/testProductDB');
     console.log('Connected!')
    }catch (error) {
     console.log('Dd is Not Connected!');
     console.log(error.message);
     process.exit(1);
    }
 }

 app.get('/', (req, res) => {
    res.send('testing the server');
  });

  app.listen(PORT, async ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
    await connectionDB();
});