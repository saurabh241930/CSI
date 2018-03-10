var  mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var MemberSchema = new mongoose.Schema({

  
MemberId                :{  
                      id:{
                           type : mongoose.Schema.Types.ObjectId,
                            ref : "User"
                          }
                   }, 
username          :String,     ////////PID - based/////////     
StudentName       :String,
Gender            :String,
Class             :String,  
RollNumber        :Number,
MobileNumber      :Number


  
});



MemberSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Member",MemberSchema);