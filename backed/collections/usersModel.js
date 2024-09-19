const mongoose= require("mongoose");
const plm = require("passport-local-mongoose");
mongoose.connect("mongodb+srv://pathak1420:PATHAK1420@cluster0.0qepf.mongodb.net/MyTodos?retryWrites=true&w=majority&appName=Cluster0");
// mongoose.connect("mongodb://localhost:27017/todoapp");


const usersModel = mongoose.Schema({
  
  googleID:String,
  username:String,
  email:String,
  password:String,
  
});

usersModel.plugin(plm);

module.exports=mongoose.model("usersModel",usersModel);
