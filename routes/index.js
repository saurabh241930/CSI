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









// router.get('/buy/:id',isLoggedIn,function(req,res){
  
//   Event.findById(req.params.id,function(err,product){
//     if (err) {
//       console.log(err);
//     } else {
      
  
      
//        res.render('show',{product:product});
//     }
//   })
// });


// router.post('/AddToCart/:id',isLoggedIn,function(req,res){ 
//  User.findById(req.user._id,function(err,user){
//     if (err) {
//       console.log(err);
//     } else {
      
//       Product.findById(req.params.id,function(req,product){
//         if (err) {
//           console.log(err);
//         } else {
          
//             var OrderInfo = {
//               id:product._id,
//               ProductImage:product.ImageMain,
//               Title:product.Title,
//               Price:product.Price
//             }
          
//           user.ProductInCart.push(OrderInfo);
//           user.save();
//           res.redirect("back");
            
//         }
         
//       })
      
      
//     }
//   })
// });



// router.get('/cart',isLoggedIn,function(req,res){
  
//   User.findById(req.user._id,function(err,user){
//     if (err) {
//       console.log(err);
//     } else {
      
// var priceListArray = user.ProductInCart.map(function(order){
//   return order.Price;
// });
      
// var TotalAmountOfCart = priceListArray.reduce(function(a, b) { return a + b; }, 0);
//         res.render('cart',{user:user,TotalAmountOfCart:TotalAmountOfCart});
//     }
//   })
// });


// router.delete('/cart/remove/:ordername/:id',isLoggedIn,function(req,res){
   
// User.update({_id:req.user._id},{ $pull:{ProductInCart:{_id:req.params.id}}},function(err,deleted){
//   if (err) {
//     console.log(err)
//   } else {
//     res.redirect("back");
//   }
// })  
      
// })


// router.post('/buy/:id/order',isLoggedIn,function(req,res){
  
//   Product.findById(req.params.id,function(err,product){
//     if (err) {
//       console.log(err);
//     } else {
       
//       User.findById(req.user._id,function(err,user){
//         if (err) {
//           console.log(err);
//         } else {
          
          
//           var Title = product.Title;
//           var Price = product.Price;
//           var Image = product.ImageMain;
//           var ProductID = product._id;
//           var Size = req.body.Size;
//           var AreaPincode = req.body.AreaPincode;
//           var ShippingAddress = req.body.ShippingAddress;
//           var UserFullName = req.body.UserFullName;
//           var UserPhoneNo = req.body.UserPhoneNo;
//           var BuyedByTheUser = req.user.username;
//           var Quantity = req.body.Quantity;
          
    
//           var newOrder = {
//             Title:Title,
//             Price:Price,
//             Image:Image,
//             Size:Size,
//             Quantity:Quantity,
//             ProductID:ProductID,
//             AreaPincode:AreaPincode,
//             ShippingAddress:ShippingAddress,
//             UserFullName:UserFullName,
//             UserPhoneNo:UserPhoneNo,
//             BuyedByTheUser:BuyedByTheUser
//           }
          
        
//     Order.create(newOrder,function(err,createdOrder){
//       if (err) {
//         console.log(err);
//       } else {
        
//         User.findById(req.user._id,function(err,user){
//           if (err) {
//             console.log(err);
//           } else {
            
//             var OrderInfo = {
//               id:createdOrder._id,
//               OrderName:createdOrder.Title,
//               ProductImage:createdOrder.Image,
//               PlacedOn:createdOrder.OrderPlacedOn,
//               Price:createdOrder.Price,
//               Quantity:createdOrder.Quantity
//             }
            
//             user.Orders.push(OrderInfo);
//             user.save();
            
//         Product.find({},function(err,products){
//     if (err) {
//       console.log(err);
//     } else {
//       res.redirect("/");
//     }
//   })       
//           }
//         })
//       }
//     })       
//         }
//       })
      
//     }
//   }) 
// });



// //////////////////MY ORDERS////////////1
// router.get('/myOrders',function(req,res){
  
//   User.findById(req.user._id,function(err,user){
//     if (err) {
//       console.log(err);
//     } else {
      
//           Order.find({},function(err,orders){
//     if (err) {
//       console.log(err);
//     } else {
      
//     res.render('myOrders',{user:user,orders:orders});
//     }
//   })
      
      
      
      
// //         res.render('myOrders',{user:user});
//     }
//   })
// });

// //////////////////MY ORDERS////////////o


// router.get('/order/:id',function(req,res){
//   Order.findById(req.params.id,function(err,order){
//     if (err) {
//       console.log(err);
//     } else {
//       res.render('order',{order:order});
//     }
//   })
  
  
// });



// router.delete('/order/cancel/:id',function(req,res){
//   Order.findByIdAndRemove(req.params.id,function(err,deletedOrder){
//     if (err) {
//       console.log(err);
//     } else {
//     res.redirect("/myOrders");
     
//     }
//   })
  
  
// });












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