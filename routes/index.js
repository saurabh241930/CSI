var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User');
var Image = require('../models/Image');
var Event = require('../models/Event');
var Member = require('../models/Member');





router.get('/',function(req,res){
  

      
       Event.find({},function(err,events){
    if (err) {
      console.log(err);
    } else {
      
     Image.find({},function(err,images){
    if (err) {
      console.log(err);
    } else {
      
      res.render('index',{events:events,images:images});
        }
  })
       }
  })
  
 
  
  
});



router.get('/open/:id',isLoggedIn,function(req,res){
  Event.findById(req.params.id,function(err,event){
    if (err) {
      console.log(err)
    } else {
       User.findById(req.user._id,function(err,user){
         if (err) {
          console.log(err)
        } else {
          res.render("Event",{event:event,user:user})
        }
       })
      
    }
  })
})
       

router.post('/register/:id/:EventName',function(req,res){

     
            
              
               
          Event.findById(req.params.id,function(err,event){
            if (err) {
              console.log(err)
            } else {
              
              
                User.findById(req.user._id,function(err,user){
         if (err) {
          console.log(err)
        } else {
         
          if (event.RegisteredStudents.some(user=>user.id.toString() === req.user._id.toString())) {
            console.log("already registerd");
            res.redirect("back");
          } else {
                var eventToRegister = {
            id:req.params.id,
            EventName:req.params.EventName
          }
          
          user.RegisteredEvents.push(eventToRegister);
          user.save(function(err,saved){
            if (err) {
              console.log(err)
            } else {
           
              
              var Register = {
                              id:req.user._id,
                              StudentName:req.user.StudentName
                              }
              
          event.RegisteredStudents.push(Register);
          event.save(function(err,saved){
            if (err) {
              console.log(err)
            } else {
                res.redirect("back");
            }
          })
            }
          })
          }
        }
                })
            }
          })
   
})                    






router.post('/RegisterForCSI/',function(req,res){

      
   var newMember = {
                MemberId:req.user._id,
                username:req.user.username,
                StudentName:req.user.StudentName,
                Gender:req.user.Gender,
                Class:req.user.Class,
                RollNumber:req.user.RollNumber,
                MobileNumber:req.user.MobileNumber
                }
      
   Member.create(newMember,function(err,newestMember){
     if (err) {
      console.log(err)
    } else {
      
      User.findById(req.user._id,function(err,user){
        if (err) {
          console.log(err)
        } else {
          user.CSImembership = "Registered";
          user.ModalText = "#Registered";
          user.save();
        }
      })
      
      
      console.log("Member added");
      res.redirect("back");
    }
   })
   
  
  
  
})




router.get('/contact',function(req,res){
  res.render('contact');
});


router.get('/allEvents',function(req,res){
    Event.find({},function(err,events){
    if (err) {
      console.log(err);
    } else {
 
  res.render('allEvents',{events:events});
    }
    })
});


// Room.find({}).sort('-date').exec(function(err, docs) { })


router.get('/pastEvents',function(req,res){
    Event.find({}).sort('-EventDate').exec(function(err,events){
    if (err) {
      console.log(err);
    } else {
 
  res.render('pastEvents',{events:events});
    }
    })
});

router.get('/gallery',function(req,res){
    Image.find({},function(err,images){
    if (err) {
      console.log(err);
    } else {
 
  res.render("gallery",{images:images});
    }
    })
});




//////////////////////////////////////////AUTH ROUTES////////////////////////////////////////
//register
router.get('/register',function(req,res){
  res.render('register');
});

//Sign Up logic
router.post('/register',function(req,res){
var newUser = new User ({
                        username: req.body.username,
                        StudentName : req.body.StudentName,
                        Gender : req.body.Gender,
                        Class : req.body.Class,
                        RollNumber : req.body.RollNumber,
                        MobileNumber : req.body.MobileNumber
                        });
  

  

User.register(newUser,req.body.password,function(err,user){
if (err) {
console.log(err);
return res.render('register');
} else {
passport.authenticate("local")(req,res,function(){
res.redirect('/');
})
}

})

});


/////////////////////Login route///////////////////////////
// router.get('/login',function(req,res){
// res.render('login');
// });

//login logic
// app.post('/login',middleware,callback)
router.post('/login',passport.authenticate("local",
{successRedirect: "/",
failureRedirect: "/"
}),function(req,res){

});


router.get('/logout',function(req,res){
req.logout();
res.redirect('/');
});


////////////////// #### Middleware ##### for checking if user is logged in or not//////////////////////////////////////
function isLoggedIn(req,res,next){
  if (req.isAuthenticated()) {
    return next();
  } else {
    
    res.render('login');
  }
}


 module.exports = router;    