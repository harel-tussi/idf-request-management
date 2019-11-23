const router = require("express").Router();
const Soldier = require("../models/Soldier");
const Commander = require("../models/Commander");
const cryptPassword = require("../util/cryptPassword");
const validateInput = require("../util/validateInput");
const createToken = require("../util/createToken");

// adding new Soldier to DB
router.post("/addcommander", async (req, res, next) => {
  if (validateInput(req.body)) {
    const { id, firstName, lastName, password } = req.body;
    if (!(await Commander.findOne({ id }))) {
      if (!(await Soldier.findOne({ id }))) {
        await new Commander({
          id,
          firstName,
          lastName,
          password: cryptPassword(password)
        }).save();
        res.send(createToken({ id, firstName, lastName }));
      } else {
        res.status(500).send("Soldier Already Exists!");
      }
    } else {
      res.status(500).send("Commander Already Exists!");
    }
  } else {
    res.status(500).send("Fields Must Not be Empty");
  }
});

router.get("/getallcommanders", async (req, res, next) => {
  res.send(await Commander.find({}).select("id firstName lastName"));
});

module.exports = router;
