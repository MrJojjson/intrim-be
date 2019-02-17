const User = require("../models/user");
const Organisation = require("../models/organisation");

user = (req, res) => {
  let { id, value } = Object.keys(req.query).length > 0 ? req.query : req.body;
  const validationObject = {[id]: value};
  return User.find(validationObject)
  .then(data => {
    if (data.length <= 0) {
      return res.json({ success: true, data: `No ${id} exists` });
    }
    return res.json({ success: false, data: `Already a user with ${id}: ${value}` });
  })
  .catch(err => {
    return res.json({ success: false, data: err });
  });
};

organisation = (req, res) => {
  let { id, value } = Object.keys(req.query).length > 0 ? req.query : req.body;
  const validationObject = {[id]: value};
  return Organisation.find(validationObject)
  .then(data => {
    if (data.length <= 0) {
      return res.json({ success: true, data: `No ${id} exists` });
    }
    return res.json({ success: false, data: `Already a organisation with ${id}: ${value}` });
  })
  .catch(err => {
    return res.json({ success: false, data: err });
  });
};

module.exports = {
  user: (req, res) => user(req, res),
  organisation: (req, res) => organisation(req, res),
};