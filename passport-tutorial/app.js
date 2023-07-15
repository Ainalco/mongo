const express= require('express');
const cors=require("cors");
const ejs=require("ejs");
const User = require('./models/user.models');
const app= express();
const bcrypt = require('bcrypt');
const saltRounds = 10;
require("./config/database");
require("./models/user.models");
app.set("view engine","ejs");
app.use (cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Base Url
app.get("/",(req,res)=>{
    res.render("index");
});

//Register :get
app.get("/register",(req,res)=>{
    res.render("register");
});

//Register :post
app.post("/register", async (req,res)=>{
    try {
        const user= await User.findOne({username: req.body.username});
        if(user){
            return res.status(201).send("User is Already Exist");
        }else{
            bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
                const newUser = new User({
                    username: req.body.username,
                  password:hash,
                });
                
                await newUser.save();
                res.status(201).redirect("/login");
            });
            
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
    
});
//Login :get
app.get("/login",(req,res)=>{
    res.render("login");
});
//Login :post
app.post("/login",(req,res)=>{
    try {
        res.status(201).send("User is Logedin");
    } catch (error) {
        res.status(500).send(error.message);
    }
});
//profile : protected
app.get("/profile",(req,res)=>{
    res.render("profile");
});

//logout route
app.get("/logout",(req,res)=>{
    res.redirect("/");
});

module.exports=app;