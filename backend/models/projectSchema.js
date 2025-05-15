const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  language: {
    type: String, // e.g., HTML, JS, Python, etc.
    required: true,
  },
  projectType: {
    type: String,
    enum: ["web", "terminal"],
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "host", "collaborator"],
    default: "host"
  },
  codeFiles: [
    {
      filename: String,
      content: String,
    },
  ],
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  collaborators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  inviteCode: {
    type: String, // generated unique code for sharing
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
