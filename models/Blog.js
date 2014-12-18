var mongoose = require('mongoose');

var BlogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content:{ type: String, required: true, trim: true },
  created_at    : { type: Date },
  updated_at    : { type: Date }
  
});

BlogSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

module.exports = mongoose.model('Blog', BlogSchema);
