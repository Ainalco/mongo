const express= require('express');
const mongoose = require("mongoose");
const app= express();
const PORT=3000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
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

  app.post('/products', async (req, res) => {

    try {
      // const title=req.body.title;
      // const price=req.body.price;
      // const description= req.body.description;

      //save single data to database store
      // const newProduct= new Product({
      //   title:title,
      //   price:price,
      //   description:description
      // });
      // const productdata= await newProduct.save();
      

      //store multiple data
      const productdata= await Product.insertMany([
        {
          title: "iphone 5",
          price :15000,
          description:"Test iphone"
        },
        {
          title: "iphone 6",
          price :17000,
          description:"Test iphone 5"
        }

      ]);



      res.status(201).send(productdata);
      
    } catch (error) {
      res.status(500).send({message:error.message});
    }
    
  });
  
app.listen(PORT, async ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
    await connectionDB();
});