const router = require("express").Router();
const Soldier = require("../models/Soldier");
const Commander = require("../models/Commander");
const Request = require("../models/Request");
const validateInput = require("../util/validateInput");

// adding new Soldier to DB
router.post("/addrequest", async (req, res, next) => {
  if (validateInput(req.body)) {
    const { content, startDate, endDate, soldier, commander } = req.body;
    if (
      (await Commander.findOne({ id: commander })) &&
      (await Soldier.findOne({ id: soldier }))
    ) {
      await new Request({
        content,
        startDate,
        endDate,
        soldier,
        commander
      }).save();
      res.send("Success");
    } else {
      res.status(500).send("Soldier or Commadner Already Exists!");
    }
  } else {
    res.status(500).send("Fields Must Not be Empty");
  }
});

module.exports = router;
