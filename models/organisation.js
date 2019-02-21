const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganisationSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
},
  { timestamps: true }
);

OrganisationSchema.pre('save', function (next) {
  var organisation = this;
  bcrypt.hash(organisation.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    organisation.password = hash;
    console.log('HASHED ORGANISATION PASS => ', organisation.password);
    return next();
  })
});

const Organisation = mongoose.model('Organisation', OrganisationSchema);
module.exports = Organisation;