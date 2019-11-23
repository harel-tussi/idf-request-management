const router = require("express").Router();
const Soldier = require("../models/Soldier");
const Commander = require("../models/Commander");
const validateInput = require("../util/validateInput");
const createToken = require("../util/createToken");
const verifyPassword = require("../util/verifyPassword");
const verifyToken = require("../util/verifyToken");

// adding new Soldier to DB
router.post("/login", async (req, res, next) => {
  if (validateInput(req.body)) {
    const { id, password, type } = req.body;
    if (type === "soldier") {
      const soldier = await Soldier.findOne({ id });
      if (soldier) {
        if (verifyPassword(password, soldier.password)) {
          res.send(
            createToken({
              id: soldier.id,
              firstName: soldier.firstName,
              lastName: soldier.lastName,
              personalCommander: soldier.personalCommander,
              type: "soldier"
            })
          );
        } else {
          res.status(500).send("Password Is Not Valid");
        }
      } else {
        res.status(500).send("Soldier not exist");
      }
    } else if (type === "commander") {
      const commander = await Commander.findOne({ id });
      if (commander) {
        if (verifyPassword(password, commander.password)) {
          res.send(
            createToken({
              id: commander.id,
              firstName: commander.firstName,
              lastName: commander.lastName,
              type: "commander"
            })
          );
        } else {
          res.status(500).send("Password Is Not Valid");
        }
      } else {
        res.status(500).send("Commander not exist");
      }
    } else {
      res.status(500).send("You are not commander or soldier");
    }
  } else {
    res.status(500).send("Fields Must Not be Empty");
  }
});

router.get("/verifytoken", (req, res) => {
  res.send(verifyToken(req.headers["authorization"]));
});

module.exports = router;
