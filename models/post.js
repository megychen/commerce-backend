var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: String,
  author: String,
  postLink: String,
  postImg: String,
  timestamp: String
});

const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;