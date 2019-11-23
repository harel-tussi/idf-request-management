const verifyToken = require("../util/verifyToken");
module.exports = (type = "both") => (req, res, next) => {
  if (req.headers["authorization"]) {
    const token = verifyToken(req.headers["authorization"]);
    if (token) {
      if (type === "both") {
        next();
      } else if (type === "soldier" && token.type === "soldier") {
        next();
      } else if (type === "commander" && token.type === "commander") {
        next();
      } else {
        res.send("Unauthorized action!").status(401);
      }
    } else {
      res.send("Unauthorized action!").status(401);
    }
  } else {
    res.send("Unauthorized action!").status(401);
  }
};
