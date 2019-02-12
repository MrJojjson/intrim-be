const User = require("../models/user");

user = (req, res) => {
  let { id, value } = Object.keys(req.query).length > 0 ? req.query : req.body;
  const validationObject = {[id]: value};
  return User.find(validationObject)
  .then(data => {
    if (data.length <= 0) {
      return res.json({ success: true, data: `No ${id} exists` });
    }
    return res.json({ success: false, error: `${id} already exists!` });
  })
  .catch(err => {
    return res.json({ success: false, error: err });
  });
};

module.exports = {
  user: (req, res) => user(req, res),
};