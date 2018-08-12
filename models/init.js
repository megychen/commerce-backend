var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:32768/commerce', {
  useNewUrlParser: true
});