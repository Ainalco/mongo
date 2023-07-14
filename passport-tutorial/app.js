//Match database hashing md5 with salting Authentic
require("dotenv").config();
const express= require('express');
// const cors = require('cors');
// const mongoose = require("mongoose");
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const User=require("./models/user.models");
const app= express();
const PORT=process.env.PORT || 3000;
//const dbURL=process.env.MONGO_URL

// app.use(cors());
// app.use(express.urlencoded({extended:true}));
// app.use(express.json());


// mongoose.connect(dbURL).
// then(()=>{
//   console.log('Mongoose Connected!');
// })
// .catch((error)=>{
//   console.log(error);
//   process.exit(1);
// })

// app.get('/', (req, res) => {
//     res.sendFile(__dirname+"/./views/index.html");
//   });

 
// app.post('/register', async (req, res) => {
//   //const {email,password}=req.body;
//   try {
//     bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
//       const newUser = new User({email: req.body.email,
//         password:hash,
//       });
//         await newUser.save();
//         res.status(201).json(newUser);
//   });
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

//   app.post('/login', async (req, res) => {
//     try {
//       const email=req.body.email;
//       const password=req.body.password;
//       const user=await User.findOne({email:email});
//       if(user){
//         bcrypt.compare(password, user.password, function(err, result) {
//           if(result==true){
//             res.status(200).json({status:'valid User'});
//           }
//       });
        
//       }else{
//         res.status(404).json({staus:"NOt valid user"});
//       }
     
//    } catch (error) {
//      res.status(500).send(error.message);
//    }   
//   });
//   app.use((req,res, next)=>{
//     res.status(404).json({
//       message: "Route not Found",
//     });
//   });
//   app.use((err,req,res, next)=>{
//     res.status(500).json({
//       message: "Something Wrong",
//     });
//   });
app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
});