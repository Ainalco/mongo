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
  // use Limit
  app.get('/products', async (req, res) => {
    try {
       const products=await Product.find().limit(10);
      if(products){
        res.status(200).send(products);
        
      }
    } catch (error) {
      res.status(400).send({message:error.message});
    }
  }); 
 // Search by id
  app.get('/products/:id', async (req, res) => {
    try {
      const id= req.params.id;
      //return array object multiple
      //const products=await Product.find({_id: id});
      //return single array
      // const products=await Product.findOne({_id: id});
      //select column using select
      //const products=await Product.findOne({_id: id}).select({title:1,price:1,_id:0});
      //select column using findOne
      //1=true and 0 means false
      const products=await Product.findOne({_id: id},{title:1,_id:0});
      if(products){
        //single array
        //res.status(200).send(products); 
        //array object  
        res.status(200).send({
          message: "Return Single Product",
          data:products
        });      
      }
    } catch (error) {
      res.status(400).send({message:error.message});
    }
  }); 
  // use Comparision Operation
  // lt= lessThan,lte=lessthan and equal,gt=greterthan,gte=greterthan and equal,eq=equal,in=match vanlue in array,ne=not equal,nin=not in array
  app.get('/allproducts', async (req, res) => {
    try {
      const price=req.query.price;
      let products;
      if(price){
       products=await Product.find({price:{$gt:price}});
      }else{
        products=await Product.find();
      } 
      //const products=await Product.find({price:{$nin:[200000,15000,17000,50000]}});
      if(products){
        res.status(200).send(products);
        
      }
    } catch (error) {
      res.status(400).send({message:error.message});
    }
  }); 
  // Logical Operator Operation
  //and ={$and:[{price:{$lt:price},{title:{$eq:"iphone 5"}}}]}
   //or ={$or:[{price:{$lt:price},{title:{$eq:"iphone 5"}}}]}
  app.get('/allproductsby', async (req, res) => {
    try {
      const price=req.query.price;
      let products;
      if(price){
        console.log(price);
       products=await Product.find({$and:[{price:{$gte:price}},{rating:{$gt:4}}],});
      }else{
        products=await Product.find();
      } 
      //const products=await Product.find({price:{$nin:[200000,15000,17000,50000]}});
      if(products){
        res.status(200).send(products);
        
      }
    } catch (error) {
      res.status(400).send({message:error.message});
    }
  }); 
  // Count result with logcal operator
  app.get('/allproductsbycount', async (req, res) => {
    try {
      const price=req.query.price;
      const rating=req.query.rating;
      let products;
      if(price){
        products=await Product.find({
        $or:[{price:{$gte:price}},{rating:{$gt:
          rating}}],
        }).countDocuments();
      }else{
        products=await Product.find().countDocuments();
      } 
      if(products){
        res.status(200).send({
          succss:true,
          message:"Return All Data",
          data:products});
        
      }
    } catch (error) {
      res.status(400).send({
        succss:false,
        message:error.message});
    }
  }); 
// sorting result with logcal operator
// 1=ASCENDING,-1=Decending
app.get('/allproductsbysort', async (req, res) => {
  try {
    const price=req.query.price;
    const rating=req.query.rating;
    let products;
    if(price){
      products=await Product.find({
      $or:[{price:{$gte:price}},{rating:{$gt:
        rating}}],
      }).sort({price:-1});
    }else{
      products=await Product.find().sort({price:1});
    } 
    if(products){
      res.status(200).send({
        succss:true,
        message:"Return All Data",
        data:products});
      
    }
  } catch (error) {
    res.status(400).send({
      succss:false,
      message:error.message});
  }
});
// sorting result with logcal operator and select specific fields
// 1=ASCENDING,-1=Decending
app.get('/allproductsbysortandselect', async (req, res) => {
  try {
    const price=req.query.price;
    const rating=req.query.rating;
    let products;
    if(price){
      products=await Product.find({
      $or:[{price:{$gte:price}},{rating:{$gt:
        rating}}],
      }).sort({price:-1}).select({title:1,_id:0});
    }else{
      products=await Product.find().sort({price:1}).select({title:1,_id:0});
    } 
    if(products){
      res.status(200).send({
        succss:true,
        message:"Return All Data",
        data:products});
      
    }
  } catch (error) {
    res.status(400).send({
      succss:false,
      message:error.message});
  }
});
//Delete
app.delete('/products/:id', async (req, res) => {

  try {     
    const id=req.params.id;
    //Delete single item
    //const productdata= await Product.deleteOne({_id:id});
    //Delete and show deleted item information
    const productdata= await Product.findByIdAndDelete({_id:id});
    res.status(200).send({
      succss:true,
      message:"Return All Data",
      data: productdata,
    });
    
  } catch (error) {
    res.status(404).send({
      succss:false,
      message:error.message
    });
  }
  
});
// Update 
app.put('/products/:id', async (req, res) => {
  try {
    const id= req.params.id;
    const title= req.body.title;
    const description= req.body.description;
    const rating= req.body.rating;

    //find single item with tem information
    const products=await Product.findByIdAndUpdate(
      {_id: id},
      {
      $set:{
        title:title,
        description:description,
        rating:rating,
      }      
    },
    //show updated filed value
    {new: true}
    );
    if(products){
      //single array
      //res.status(200).send(products); 
      //array object  
      res.status(200).send({
        success:true,
        message: "Updated Single Product",
        data:products
      });      
    }
  } catch (error) {
    res.status(400).send({
      success:false,
      message:error.message
    });
  }
}); 
app.listen(PORT, async ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
    await connectionDB();
});