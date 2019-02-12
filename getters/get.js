const User = require("../models/user");

user = (req, res) => {
  let { email } = Object.keys(req.query).length > 0 ? req.query : req.body;
  return User.find({email})
  .then(data => {
    return res.json({ success: true, data: data });
  })
  .catch(err => {
    return res.json({ success: false, error: err });
  });
};

module.exports = {
  user: (req, res) => user(req, res),
};