var  mongoose = require('mongoose');


var EventSchema = new mongoose.Schema({

EventName:  {type:String,default:"No name given"},
Date :      {type:Date,default:Date.now},
MainImage:  {type:String,default:"https://i.imgur.com/uyuYpDi.jpg"},
OtherImages:[
            {image:String}
            ],
EntryFee:    {type:Number,default:0},
Description:{type:String,default:"No description given"},  
  
Particpants:[{
            id:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
            },
            username: String
            
            }] ,
  
  SubEvents:[{
            eventName: String,
            eventDate: Date,
            eventImage:String,
            eventDescription:String
            
            }] 


});



module.exports = mongoose.model("Event",EventSchema);