const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username: {
      type: String,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    password: {
      type: String,
    },
    createon: {
        type: Date,
        default: Date.now
    }
  });
  
  
  UserSchema.statics.getUserById = function(eid){
    return this.find({_id: req.query.id}).select("_id cuisine name city restaurant_id");
  }
  
  UserSchema.query.sortByUsertId = function(flag){
    return this.sort({'restaurant_id': flag});
  }
  

  UserSchema.post('init', (doc) => {
    console.log('%s has been initialized from the db', doc._id);
  });
  
  UserSchema.post('validate', (doc) => {
    console.log('%s has been validated (but not saved yet)', doc._id);
  });
  
  UserSchema.post('save', (doc) => {
    console.log('%s has been saved', doc._id);
  });
  
  UserSchema.post('remove', (doc) => {
    console.log('%s has been removed', doc._id);
  });
  
  const User = mongoose.model('user', UserSchema);
  
  module.exports = User;