const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const soldierSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  personalCommander: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Soldier", soldierSchema);
