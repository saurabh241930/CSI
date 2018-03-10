var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User');
var Image = require('../models/Image');
var Event = require('../models/Event');
var Member = require('../models/Member');
var flash = require('connect-flash');
 var cloudinary = require('cloudinary');
  var multer = require('multer'); 


router.get('/AdminPortal',function(req,res){
  if (req.user.username.toString() === "Admin" ) {
      res.render('adminPage');
  } else {
    res.render("login")
  }
});








router.get('/uploadImage',function(req,res){
  res.render("uploadImage")
})





 var upload = multer({ dest: './uploads/'});

 router.post('/imageUpload', upload.single('file'), function(req,res){
   
 
    cloudinary.uploader.upload(req.file.path,
    function(result){
      
      var newImage = {
        ImageURL:result.secure_url
      }
      
      Image.create(newImage,function(err,image){
        if (err) {
          console.log(err)
        } else {
          res.redirect("/");
        }
      })

     

    })
 })

 




router.get('/AdminPortal',function(req,res){
  if (req.user.username.toString() === "Admin" ) {
      res.render('adminPage');
  } else {
    res.render("login")
  }
});


router.get('/EditEvent',function(req,res){
  
  
      res.render('EditEvent');
 
  
 
});


router.get('/AddEvent',function(req,res){
  res.render("AddEvent")
})



router.post('/AddEvent',function(req,res){
  
  
  var eventDate = req.body.EventDate;
  console.log(eventDate);
  eventDate = eventDate.split(" ");
  console.log(eventDate);
  
  
  
   var newEvent = {
            EventName:req.body.EventName,
            EventDate:req.body.EventDate,
            EventDateInWords:req.body.EventDateInWords,
            EventDescription:req.body.EventDescription
            }
  
  Event.create(newEvent,function(err,createdEvent){
    if (err) {
      console.log(err)
    } else {
      res.redirect("back");
    }
  })
  
})



router.get('/CSImembers',function(req,res){
     
      
      res.render('members');
   
})


router.get('/CSImembers/compsA',function(req,res){
      User.find({'Class':'S.E - Computer Engineering(A)'},function(err,members){
    if (err) {
      console.log(err);
    } else {
      
      res.render('CompsAmembers',{members:members});
        }
  })
})


router.get('/CSImembers/compsB',function(req,res){
      User.find({'Class':'S.E - Computer Engineering(B)'},function(err,members){
    if (err) {
      console.log(err);
    } else {
      
      res.render('CompsBmembers',{members:members});
        }
  })
})


router.get('/CSImembers/IT',function(req,res){
      User.find({'Class':'S.E - IT'},function(err,members){
    if (err) {
      console.log(err);
    } else {
      
      res.render('ITmembers',{members:members});
        }
  })
})









router.post('/EditEvent/:id',function(req,res){
 

 Event.findById(req.params.id,function(err,event){
         
         if (err) {
          console.log(err);
        } else {
          
          
            
            var eventInfo = {
            eventName:req.body.eventName,
            eventDescription:req.body.eventDescription
           
            }
      
     event.SubEvents.push(eventInfo);
     event.save();
  
  
  
  
  
  
  
//   Event.findById(req.params.id,function(err,event){
//     if (err) {
//       console.log(err);
//     } else {
      
   
//       var newEvent = { eventName:req.body.eventName,
//                       eventDate:req.body.eventDate,
//                       eventDescription:req.body.eventDescription
//                      }
      
//       event.SubEvents.push(newEvent)
//       event.save()
      
//       console.log(event);
      
//       res.redirect("back");
      
      
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