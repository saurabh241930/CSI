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
CSImembership     :{type:String,default:"Register Now"},
ModalText         :{type:String,default:"#Register"},
RegisteredEvents  :[{
                    
                    id:{
                                type : mongoose.Schema.Types.ObjectId,
                                ref : "Event"
                     },
                     EventName:String
                   }]
},{ usePushEach: true });



UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",UserSchema);