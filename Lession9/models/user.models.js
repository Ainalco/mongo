const mongoose =require("mongoose");
const encrypt = require('mongoose-encryption');

const userSchema = new mongoose.Schema({
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

  var encKey = process.env.ENC_KEY;

userSchema.plugin(encrypt, { secret: encKey, 
encryptedFields: ['password'] });
  
  module.exports = mongoose.model("User", userSchema);