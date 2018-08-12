var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  password: String
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;