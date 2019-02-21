const User = require("../models/user");
const Organisation = require("../models/organisation");

const OrganisationSettings = require("../settings/organisation");

user = (req, res) => {
  let { id, value } = Object.keys(req.query).length > 0 ? req.query : req.body;
  checkForIdAndValue(id, value, res);

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
  checkForIdAndValue(id, value, res);

  const { password, name } = OrganisationSettings;
  const lowerId = id.toLowerCase();

  if (lowerId === 'password' && value.length < password.minlength) {
    return res.json({ success: false, data: `Password needs to be at least ${password.minlength} characters long!` });
  }
  if (lowerId === 'name' && value.length < name.minlength) {
    return res.json({ success: false, data: `Organisation name needs to be at least ${name.minlength} characters long!` });
  }

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

checkForIdAndValue = (id, value, res) => {
  if (!id) {
    return res.json({ success: false, data: `ERROR` });
  }
  if (!value) {
    return res.json({ success: false, data: `Please add a value for: ${id}` });
  }
}

module.exports = {
  user: (req, res) => user(req, res),
  organisation: (req, res) => organisation(req, res),
};