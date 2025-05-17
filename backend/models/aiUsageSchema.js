const mongoose = require("mongoose");

const aiUsageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: true,
  },
  response: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AIUsage = mongoose.model("AIUsage", aiUsageSchema);
module.exports = AIUsage;
