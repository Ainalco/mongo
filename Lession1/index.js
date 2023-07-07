const express= require('express');
const mongoose = require("mongoose");
const app= express();
const PORT=3000;
// Normal way to db connect
// mongoose.connect('mongodb://127.0.0.1:27017/newtestDB')
// .then(() => console.log('Connected!'))
// .catch((error) =>{ console.log('Dd is Not Connected!');
// console.log(error);
// process.exit(1);
// });

//Another Way is
const connectionDB= async ()=>{
   try{
    await mongoose.connect('mongodb://127.0.0.1:27017/newtestDB');
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