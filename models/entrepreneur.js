var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EntrepreneurSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  title: String,
  company: String,
  description: String,
  avatar: String
});

const EntrepreneurModel = mongoose.model('Entrepreneur', EntrepreneurSchema);

module.exports = EntrepreneurModel;