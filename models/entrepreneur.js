var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = Schema.ObjectId;

var EntrepreneurSchema = new Schema({
  title: String,
  content: String,
  authorId: ObjectId,
  timestamp: String
});

const EntrepreneurModel = mongoose.model('Entrepreneur', EntrepreneurSchema);

module.exports = EntrepreneurModel;