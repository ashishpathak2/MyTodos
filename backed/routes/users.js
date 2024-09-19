var express = require('express');
var router = express.Router();
const usersModel = require("../collections/usersModel");
const passport = require("passport")
const passportLocal = require("passport-local");
const googlePassport = require("passport-google-oauth20");
const otpGenerator = require('otp-generator')
var nodemailer = require('nodemailer');




passport.use(new passportLocal( usersModel.authenticate() ));


passport.use(new googlePassport({
  callbackURL:"https://mytodos-3gmr.onrender.com/users/auth/google",
  clientID:"95363308184-nebmo0nlt7n0ivqen9g4ttv7bqga8p80.apps.googleusercontent.com",
  clientSecret:"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"
},(accessToken,refreshToken,profile,done)=>{
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


// router.get("/auth",passport.authenticate("google",{
//   scope:["profile","email"]
// }));


// router.get("/auth/google",passport.authenticate("google"),function (req,res) {
//   res.redirect("https://my-todos-1koj.vercel.app")
  
// })


// router.get("/authUserName",function(req,res){

//    res.send(req.session.passport.user.username);
// })


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

 

  // router.post("/login",passport.authenticate("local"),function (req,res){
  //    res.send(req.session.passport.user.username)
    
  // })

  router.post("/login", passport.authenticate("local", {
    failureRedirect: "/login-failure", // Redirect on failure
    successRedirect: "https://my-todos-1koj.vercel.app/",     // Redirect on success
    // failureFlash: true
  }), function (req, res) {
    console.log(req.session.passport.user.username);
    res.send(req.session.passport.user.username); 
  });
  
  // Optional login failure route
  router.get("/login-failure", (req, res) => {
    res.send("Login failed. Incorrect username or password.");
  });
  
  
  router.get("/logout", function (req,res,next) {
    req.logout(function(err){
      if (err) {
        return next(err)
      }
    })
    res.status(200).send("logout");
  })
  


//  router.post("/forgetPassword",async function(req,res){
//    const email = await usersModel.findOne({email:req.body.email})
//     if (!email) {
//       return res.send("Invalid Email")
//     }
//     req.session.passwordResetUser = email
//     req.session.OTP = otpGenerator.generate(6, {lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    

//     var transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'pathak1420@gmail.com',
//         pass: "dbwpogwaxdpfaaso"
//       }
//     });
    
//     var mailOptions = {
//       from: 'pathak1420@gmail.com',
//       to: req.body.email ,
//       subject: 'Password recovery mail from Mytodo ',
//       text: "OTP FOR PASSWORD RECOVERY: " + req.session.OTP 
//     };
    
//     transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Email sent: ' + info.response);
//       }
//     });

//       res.send("success")


// })


// router.post("/otpVerification",function (req,res) {
//   if (req.session.OTP === req.body.otp) {
//     res.send("verified")
//   }
// })


// router.post("/resetPassword",async function (req,res) {


//   usersModel.findByUsername(req.session.passwordResetUser.username, (err, user) => {
//     if (err) {
//         console.log(err);
//     } else {
//         user.changePassword("123", 
//         req.body.password, function (err) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log("success");
//             }
//         });
//     }
// });




//   res.send("password Changed")
  
// })








  
  //FUNCTION FOR PROTECTING ROUTES 
  function isLoggedIn(req,res,next){
    if (req.isAuthenticated()) {
      return next
    }
    res.send("please login")
}


  


module.exports = router;
