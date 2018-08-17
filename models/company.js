var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanySchema = new Schema({
  title: String,
  content: String,
  author: String,
  postLink: String,
  postImg: String,
  timestamp: String
});

const CompanyModel = mongoose.model('Company', CompanySchema);

module.exports = CompanyModel;