const jwt = require("jsonwebtoken");
module.exports = token => {
  try {
    return jwt.verify(token, process.env.SECRET);
  } catch (error) {
    return false;
  }
};
