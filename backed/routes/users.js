var express = require('express');
var router = express.Router();
const usersModel = require("../collections/usersModel");
const passport = require("passport")
const passportLocal = require("passport-local");
const googlePassport = require("passport-google-oauth20");


passport.use(new passportLocal(usersModel.authenticate()));


passport.use(new googlePassport({
  callbackURL:"https://mytodosapp-6h9w.onrender.com/users/auth/google",
  clientID:"95363308184-nebmo0nlt7n0ivqen9g4ttv7bqga8p80.apps.googleusercontent.com",
  clientSecret:"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"
},(accessToken,refreshToken,profile,done)=>{
  console.log(profile);
    usersModel.findOne({googleID:profile.id}).then((currentUser)=>{
      if (currentUser) {
        return done(null,currentUser)
      }
      new usersModel({
        googleID:profile.id,
        email:profile._json.email,
        username:profile.displayName
      }).save().then((newUser)=>{
        done(null,newUser)
      })
    

    })
 
})
)


passport.serializeUser(function(user,done){
  done(null,user);
})

passport.deserializeUser(function(user,done){
  done(null,user)
})


router.get("/auth",passport.authenticate("google",{
  scope:["profile","email"]
}));


router.get("/auth/google",passport.authenticate("google"),function(req,res){
  console.log("running");
  res.cookie("username" ,req.session.passport.user.username)
  res.redirect("https://my-todos-1koj.vercel.app")
 
})

router.post("/register", async function (req, res) {
    try {
      const existingUser = await usersModel.findOne({username:req.body.username});
      if (existingUser) {
        return res.status(200).send("username already exists")
      } 
  
      var user = new usersModel({
        username: req.body.username,
        email: req.body.email
      });
  
      usersModel.register(user, req.body.password)
        .then(
  
          function () {
            passport.authenticate("local")
              (req, res, function () {
                res.send(req.body.username);
              })
          }
        )
    } catch (error) {
      console.log(error);
    }
  });

 

  
  
  
  
  router.post("/login",passport.authenticate("local"),function (req,res){
     res.send(req.session.passport.user.username)
    
  })


  
  router.get("/logout", function (req,res,next) {
    req.logout(function(err){
      if (err) {
        return next(err)
      }
    })
    res.status(200).send("logout");
  })
  
  
  //FUNCTION FOR PROTECTING ROUTES 
  function isLoggedIn(req,res,next){
    if (req.isAuthenticated()) {
      return next
    }
    res.send("please login")
}


  


module.exports = router;
