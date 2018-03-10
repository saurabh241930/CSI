var  mongoose = require('mongoose');


var EventSchema = new mongoose.Schema({


EventName:  {type:String,default:"No name given"},
EventDescription:  {type:String,default:"No description given"},
EventDateInWords:String,
EventDate:Date,
RegisteredStudents:[{
                    
                    id:{
                                type : mongoose.Schema.Types.ObjectId,
                                ref : "User"
                     },
                     StudentName:String
                   }]


},{ usePushEach: true });
  


module.exports = mongoose.model("Event",EventSchema);