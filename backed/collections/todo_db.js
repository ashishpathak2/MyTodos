const mongoose= require("mongoose");
mongoose.connect("mongodb://mongo:XVXaxLcCjsfqOJKSwaGuUNWGiTOkYzJR@monorail.proxy.rlwy.net:15015");

const todoItem = mongoose.Schema({
  CreatedByuserId:String,
  description:String,
  priorityLevel:Number,
  timeRemaining:String
});

module.exports=mongoose.model("todoItem",todoItem);
