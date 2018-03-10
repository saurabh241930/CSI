var  mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var ImageSchema = new mongoose.Schema({

ImageURL  : String

});





module.exports = mongoose.model("Image",ImageSchema);