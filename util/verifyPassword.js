const bcrypt = require("bcryptjs");
module.exports = (password, encrypted) => {
  return bcrypt.compareSync(password, encrypted);
};
