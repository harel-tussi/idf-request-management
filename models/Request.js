const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  submissionDate: {
    type: Date,
    default: new Date()
  },
  soldier: {
    type: String,
    required: true
  },
  commander: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    required: true,
    default: 1
  },
  commanderNote: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("Request", requestSchema);
