const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');
const Schema   = mongoose.Schema;

// Define User model

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true, required: [true, 'You must provide an email.'] },
  password: { type: String, required: [true, 'You must provide a password'] }
});

// Encrypt password before save
userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

const ModelClass = mongoose.model('User', userSchema);

module.exports = ModelClass;
