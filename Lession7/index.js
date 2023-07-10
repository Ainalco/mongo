const express= require('express');
const mongoose = require("mongoose");
const app= express();
const PORT=3000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
//create schema for product and Custom validation
const productSchema = new mongoose.Schema({
  
  title:{
    type: String,
    required: [true,"Product Title is required!!."],
    minlength: [3,"Minimum Length 3"],//without message only number like:- minlength:3 
    maxlength: [50,"Maximum Length 50"],
    //lowercase: true, //anoher uppercase
    trim: true, //remove unnecessary space
    //custome validator
    validate:{
      validator: function(v) {
        return v.length==10
      },
      message: (props)=>`${props.value} is not a valid`
    }
  },
  price: {
    type: Number,
    required: true,
    min:100,
    max: 1000000
  },
  rating: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
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
  // create and Custom validation
  app.post('/products', async (req, res) => {

    try {     
      const title=req.body.title;
      const price=req.body.price;
      const rating=req.body.rating;
      const description= req.body.description;

      const newProduct= new Product({
        title:title,
        price:price,
        rating:rating,
        description:description
      });
      const productdata= await newProduct.save();
      res.status(201).send(productdata);
      
    } catch (error) {
      res.status(500).send({message:error.message});
    }
    
  });
  
app.listen(PORT, async ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
    await connectionDB();
});