const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: Number,
  firstName: {
    type: String,
    required: true,
    unique: false
  },
  lastName: {
    type: String,
    required: true,
    unique: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  organisation: {
    type: String,
    required: true,
    unique: false
  },
  organisation: {
    type: String,
    required: true,
    unique: false
  },
  password: {
    type: String,
    required: true,
  },
},
  { timestamps: true }
);

//authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

UserSchema.pre('save', function (next) {
  var user = this;
  console.log('user', user)
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;

    console.log('user 1', user)
    next();
  })
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("User", UserSchema);
