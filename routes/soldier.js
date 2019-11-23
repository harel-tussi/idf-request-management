const router = require("express").Router();
const Soldier = require("../models/Soldier");
const Commander = require("../models/Commander");
const cryptPassword = require("../util/cryptPassword");
const validateInput = require("../util/validateInput");
const createToken = require("../util/createToken");

// adding new Soldier to DB
router.post("/addsoldier", async (req, res, next) => {
  if (validateInput(req.body)) {
    const { id, firstName, lastName, password, personalCommander } = req.body;
    if (!(await Soldier.findOne({ id }))) {
      if (await Commander.findOne({ id: personalCommander })) {
        await new Soldier({
          id,
          firstName,
          lastName,
          password: cryptPassword(password),
          personalCommander
        }).save();
        res.send(createToken({ id, firstName, lastName, personalCommander }));
      } else {
        res.status(500).send("Commander Not Exists!");
      }
    } else {
      res.status(500).send("Soldier Already Exists!");
    }
  } else {
    res.status(500).send("Fields Must Not be Empty");
  }
});

module.exports = router;
