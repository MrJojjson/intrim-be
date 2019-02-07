const Data = require("../models/data");

data = res => {
  return Data.find((err, data) => {
    if (err) {
      return res.json({ success: false, error: err });
    }
    return res.json({ success: true, data: data });
  });
};

module.exports = {
  data: res => data(res),
};