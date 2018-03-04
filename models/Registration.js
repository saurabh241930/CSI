var  mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var OrderSchema = new mongoose.Schema({

EventName        : String,
RegistrationDate : {type:Date,default:Date.now},
PaymentDone      : {type:Boolean,default:false},
Registerer       : {
                     id:{
                              type : mongoose.Schema.Types.ObjectId,
                              ref : "User"
                              },
                              username: String

                  } 
  
  
});





module.exports = mongoose.model("Order",OrderSchema);