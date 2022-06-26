var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var VideoSchema = new Schema( {

  name: {
    type: String,
    required: true,
  },

  url: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },

  duration: {
    type: Number,
  },
  image:{
    type:String,
  },

 
});


const Video = mongoose.model("Video", VideoSchema);
module.exports = Video;

