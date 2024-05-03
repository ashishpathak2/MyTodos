var express = require('express');
var router = express.Router();
const todoItems = require("../collections/todo_db");




/* GET home page. */
router.get('/',function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/todo',isLoggedIn, async function (req, res) {
  console.log(req.session);
  await todoItems.find({CreatedByuserId : req.session.passport.user._id}).
    then((result) => {
      res.send(result).status(200)
    }).catch((err) => {
      console.log(err)
    });
});

router.post("/addtodo",isLoggedIn,async function (req, res) {
  try {
    
    var todo = new todoItems({
      CreatedByuserId:req.session.passport.user._id,
      description: req.body.description,
      priorityLevel: req.body.priorityLevel,
      timeRemaining: req.body.timeRemaining
    });
  
    todo.save();
    res.status(200);

  } catch (error) {
    console.log(error);
  }
});


router.delete("/deletetodo/:id", async function(req,res){
  try {
    
    await todoItems.findByIdAndDelete({_id:req.params.id});
    res.send("Deleted")
  } catch (err) {
    console.log(err);
  }
});


router.put("/edittodo/:id", async function(req,res){
  try {

    await todoItems.findByIdAndUpdate(req.params.id,{
      description: req.body.description
    });
    res.send("updated");
    
  } catch (error) {
    console.log(error);
  }
})

  //FUNCTION FOR PROTECTING ROUTES 
 function isLoggedIn(req,res,next){
    if (req.isAuthenticated()) {
      return next();
    }
    res.send("please login")
    
  }
  





module.exports = router;
