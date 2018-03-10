var  methodOverride = require('method-override'),
         bodyParser = require('body-parser'),
           mongoose = require('mongoose'),
            express = require('express'),
              flash = require('connect-flash'),

               User = require('./models/User'),
              Image = require('./models/Image'),
             Member = require('./models/Member'),
              Event = require('./models/Event'),
           passport = require('passport'),
      LocalStrategy = require('passport-local'),
        
                app = express();


       
  var  authRoutes = require('./routes/index');
  var  adminRoutes = require('./routes/adminRoutes');
  var cloudinary = require('cloudinary');
  var multer = require('multer'); 


//seedDB(); //Seed the database

//================================================PASSPORT CONFIGURATION==================================================//

 cloudinary.config({ 
 cloud_name: 'dxotafsfa', 
 api_key: '247743586122155', 
 api_secret: 'lRSmFwRap_LS-tKzXQqgdqhv8Xo' 
 }); 





app.use(require('express-session')({
  secret: "This is secret",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//================================================PASSPORT CONFIGURATION==================================================//


/////passing "currentUser" to every template/////////////////
app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  next();
})

/////////////////////////////////////////////////////////////



   //==================================================APP CONFIG=========================================================//
   mongoose.Promise = global.Promise;
   mongoose.connect('mongodb://localhost/CSI', { useMongoClient: true, });
   app.set('view engine','ejs');
   app.use(express.static(__dirname +'/public'));
   app.use(bodyParser.urlencoded({extended:true}));
   app.use(methodOverride('_method'));
  //===================================================APP CONFIG==========================================================//



///Default event creation///
//   Main.find({},function(err,main){
//     if (err) {
//       console.log(err);
//     } else {
    
//       if(main.length === 0){
//         Main.create({
//         Description:"Description of CSI"
//      })
//       }
      
      
//     }
//   })
///Default event creation///





// //==============ADDING DATA================//
//     Course.create({
//      courseTitle:'HTML basics',
//      titleImage :'http://www.spilgames.com/wp-content/uploads/2014/12/documentation_html5_logo.png',
//      Chapters:[{"lessons":"Part 1"},{"lessons":"Part2"},{"lessons":"Part3"},{"lessons":"Part4"},{"lessons":"Part5"}]
//     });

// var datas = db.blogs.find({"creater.username":"developer"});
// console.log(datas);



    



  
//==============ADDING DATA================//

//==================================================RESTFUL ROUTES=========================================================//



 app.use(authRoutes);
 app.use(adminRoutes);



app.listen(3000, function () {
  console.log('Server started');
});