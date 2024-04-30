const mongoose= require("mongoose");
const plm = require("passport-local-mongoose");
mongoose.connect("mongodb://mongo:XVXaxLcCjsfqOJKSwaGuUNWGiTOkYzJR@monorail.proxy.rlwy.net:15015");

const usersModel = mongoose.Schema({
  
  googleID:String,
  username:String,
  email:String,
  password:String,
  
});

usersModel.plugin(plm);

module.exports=mongoose.model("usersModel",usersModel);
