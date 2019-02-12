const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganisationSchema = new Schema({
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
  password: {
    type: String,
    required: true,
  },
},
  { timestamps: true }
);

OrganisationSchema.pre('save', function (next) {
  var organisation = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    usorganisationer.password = hash;
    console.log('HASHED ORGANISATION PASS => ', organisation.password);
    return next();
  })
});

const Organisation = mongoose.model('Organisation', OrganisationSchema);
module.exports = Organisation;