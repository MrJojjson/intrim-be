const url = require('url');

const User = require("../models/user");
const Organisation = require("../models/organisation");

newOrganisation = (req, res) => {
  const organisation = new Organisation();
  Object.keys(req.body).map(key => {
    return organisation[key] = req.body[key];
  });
  
  organisation.save(err => {
    console.log('inside save organisation');
    if (err) {
      return res.json({ success: false, error: err });
    }
    return res.json({ success: true });
  });
};

newUser = (req, res) => {
  const user = new User();
  Object.keys(req.body).map(key => {
    return user[key] = req.body[key];
  });
  
  user.save(err => {
    console.log('inside save user');
    if (err) {
      return res.json({ success: false, error: err });
    }
    return res.json({ success: true });
  });
};

loginUser = (req, res) => {
  const { email, password } = req.body;
  //authenticate input against database
  User.authenticate(email, password, (error, user) => {
    if (error || !user) {
      const err = {status: 401, text: 'Wrong email or password'};
      return res.json({ success: false, error: err });
    } else {
      req.session.userId = user._id;
      return (
        res.redirect(url.format({
          pathname:'/api/registration',
          query: req.body,
        }))
      )
    }
  });
};

logoutUser = (req, res, next) => {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
}

module.exports = {
  newUser: (req, res) => newUser(req, res),
  loginUser: (req, res) => loginUser(req, res),
  logoutUser: (req, res, next) => logoutUser(req, res, next),
};
