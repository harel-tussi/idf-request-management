const bcrypt = require("bcryptjs");

module.exports = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
