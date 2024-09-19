const mongoose= require("mongoose");
mongoose.connect("mongodb+srv://pathak1420:PATHAK1420@cluster0.0qepf.mongodb.net/MyTodos?retryWrites=true&w=majority&appName=Cluster0");
// mongoose.connect("mongodb://localhost:27017/todoapp");


const todoItem = mongoose.Schema({
  CreatedByuserId:String,
  description:String,
  priorityLevel:Number,
  timeRemaining:String
});

module.exports=mongoose.model("todoItem",todoItem);
