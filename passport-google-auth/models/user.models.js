const mongoose =require("mongoose");


const userSchema = new mongoose.Schema({
    username: {
      type: String,
      reuire: true,
      unique:true,
    },
    googleId: {
      type: String,
      reuire: true,
      
    },
    createdOn: {
      type: Date,
      default: Date.now,
    },
  });

  const User=mongoose.model("User", userSchema);
  module.exports =User;