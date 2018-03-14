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


router.get('/AdminPortal',isAdmin,function(req,res){

      User.find({},function(err,members){
    if (err) {
      console.log(err);
    } else {
      
      res.render('adminPage',{members:members});
        }
  })

})








router.get('/uploadImage',isAdmin,function(req,res){
  
 
  Image.find({},function(err,images){
    if (err) {
      console.log(err);
    } else {
      
      res.render('uploadImage',{images:images});
        }
  })
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
          res.redirect("back");
        }
      })

     

    })
 })

 




router.get('/AdminPortal',isAdmin,function(req,res){
  if (req.user.username.toString() === "Admin" ) {
      res.render('adminPage');
  } else {
    res.render("login")
  }
});


router.get('/EditEvent',isAdmin,function(req,res){

      res.render('EditEvent');

});


router.get('/AddEvent',isAdmin,function(req,res){
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



router.get('/profile/:id',function(req,res){
     
          User.findById(req.params.id,function(err,user){
    if (err) {
      console.log(err);
    } else {
      
      res.render('profile',{user:user});
        }
  })
     
})


router.post('/deleteMember/:id',isAdmin,function(req,res){
     
          User.findByIdAndRemove(req.params.id,function(err,user){
    if (err) {
      console.log(err);
    } else {
      
      res.redirect("back");
        }
  })
     
})


router.post('/deleteImage/:id',isAdmin,function(req,res){
     
          Image.findByIdAndRemove(req.params.id,function(err,user){
    if (err) {
      console.log(err);
    } else {
      
      res.redirect("back");
        }
  })
     
})



router.get('/eventWise',isAdmin,function(req,res){
     
          Event.find({},function(err,events){
    if (err) {
      console.log(err);
    } else {
      
      res.render('eventWise',{events:events});
        }
  })
     
})

router.get('/showEventStudents/:id',isAdmin,function(req,res){
     
  Event.find({},function(err,events){
    if (err) {
      console.log(err);
    } else {
      
         Event.findById(req.params.id,function(err,event){
    if (err) {
      console.log(err);
    } else {
      
      res.render('eventWiseStudents',{events:events,event:event});
        }
  })
        }
  })
  
  
 
   
   
})




router.get('/feCE',isAdmin,function(req,res){
      User.find({'Class':'F.E - Computer Engineering'},function(err,members){
    if (err) {
      console.log(err);
    } else {
      
      res.render('feCE',{members:members});
        }
  })
})



router.get('/feIT',isAdmin,function(req,res){
      User.find({'Class':'F.E - IT Engineering'},function(err,members){
    if (err) {
      console.log(err);
    } else {
      
      res.render('feIT',{members:members});
        }
  })
})


router.get('/feEXTC',isAdmin,function(req,res){
      User.find({'Class':'F.E - EXTC Engineering'},function(err,members){
    if (err) {
      console.log(err);
    } else {
      
      res.render('feEXTC',{members:members});
        }
  })
})



router.get('/seCE',isAdmin,function(req,res){
      User.find({'Class':'S.E - Computer Engineering'},function(err,members){
    if (err) {
      console.log(err);
    } else {
      
      res.render('seCE',{members:members});
        }
  })
})



router.get('/seIT',isAdmin,function(req,res){
      User.find({'Class':'S.E - IT Engineering'},function(err,members){
    if (err) {
      console.log(err);
    } else {
      
      res.render('seIT',{members:members});
        }
  })
})


router.get('/seEXTC',isAdmin,function(req,res){
      User.find({'Class':'S.E - EXTC Engineering'},function(err,members){
    if (err) {
      console.log(err);
    } else {
      
      res.render('seEXTC',{members:members});
        }
  })
})

router.get('/teCE',isAdmin,function(req,res){
      User.find({'Class':'T.E - Computer Engineering'},function(err,members){
    if (err) {
      console.log(err);
    } else {
      
      res.render('teCE',{members:members});
        }
  })
})



router.get('/teIT',isAdmin,function(req,res){
      User.find({'Class':'T.E - IT Engineering'},function(err,members){
    if (err) {
      console.log(err);
    } else {
      
      res.render('teIT',{members:members});
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

function isAdmin(req,res,next){
  if (req.user.username === "Admin" || req.user.username === "Saurabh") {
    return next();
  } else {
    req.flash("error","You must be logged in to do that");
    res.render('login');
  }
}






 module.exports = router; 