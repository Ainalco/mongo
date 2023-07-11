const mongoose =require("mongoose");

const userSchema = mongoose.Schema({
    email: {
      type: String,
      reuire: true,
    },
    password: {
      type: String,
      reuire: true,
    },
    createdOn: {
      type: Date,
      default: Date.now,
    },
  });
  
  module.exports = mongoose.model("User", userSchema);