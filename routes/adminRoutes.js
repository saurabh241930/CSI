var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User');
var Event = require('../models/Event');
var Order = require('../models/Registration');
var flash = require('connect-flash');



router.get('/AdminPortal',function(req,res){
  if (req.user.username.toString() === "Admin" ) {
      res.render('adminPage');
  } else {
    res.render("login")
  }
});


router.get('/EditEvent',function(req,res){
  
    Event.find({},function(err,events){
    if (err) {
      console.log(err);
    } else {
      res.render('EditEvent',{events:events});
    }
  })
  
 
});





router.post('/EditEvent/:id',function(req,res){
 


  
  Event.findById(req.params.id,function(err,Event){
    if (err) {
      console.log(err);
    } else {
      
      Event.EventName = req.body.EventName;
      Event.EntryFee = req.body.EntryFee;
      Event.Description = req.body.Description;
      Event.Date = req.body.Date;
      Event.save()
      
      res.redirect("/");
      
      
    }
    
  })
      
})

  











////////////////// #### Middleware ##### for checking if user is logged in or not//////////////////////////////////////
function isLoggedIn(req,res,next){
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("error","You must be logged in to do that");
    res.redirect('/login');
  }
}







 module.exports = router; 