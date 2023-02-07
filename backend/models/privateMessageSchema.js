const mongoose = require('mongoose');

const privateMessageSchema = new mongoose.Schema({
  from_user: {
    type: String,
  },
  to_user: {
    type: String,
    required: true.valueOf,
  },
  message: {
    type: String,
  },
  date_sent:{
    type: Date,
    default: Date.now
  }
});
const privateMsg = mongoose.model("privateMsg", privateMessageSchema);
module.exports = privateMsg;