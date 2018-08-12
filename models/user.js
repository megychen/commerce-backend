var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  password: String,
  isAdmin: {
    type: Boolean,
    default: false
  }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;