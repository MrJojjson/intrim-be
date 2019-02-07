const User = require("../models/user");

user = (req, res) => {
  const user = new User();
  Object.keys(req.body).map(key => {
    return user[key] = req.body[key];
  });
  console.log('user', user)
  user.save(err => {
    if (err) {
      return res.json({ success: false, error: err });
    }
    return res.json({ success: true });
  });
};

module.exports = {
  user: (req, res) => user(req, res),
};