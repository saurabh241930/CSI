var  mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({

username          :String,     ////////PID - based///////// 
password          :String,     ////////PID - based/////////      
StudentName       :String,
Gender            :String,
Class             :String,  
RollNumber        :Number,
MobileNumber      :Number,
RegisteredEvents  :[{
  
                      EventId      :{
                                       type : mongoose.Schema.Types.ObjectId,
                                       ref : "Event"
                                    },
  
                      RegistrationId :{
                                       type : mongoose.Schema.Types.ObjectId,
                                       ref : "Registration"
                                   },
  
                      EventName       :String,
                      RegistrationDate:{type:Date,default:Date.now},
  
                    }]


  
});



UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",UserSchema);