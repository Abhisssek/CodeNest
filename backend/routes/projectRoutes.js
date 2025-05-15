const express = require("express");
const router = express.Router();
const { createProject, joinProject, getAllProjects, getProject, getCollaboratorProjects, removeCollaborator, updateCodeFiles, deleteProject } = require("../controllers/projectCotroller");
const isAuth = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/authorizeRole");

router.post("/create", isAuth, createProject);
router.post("/join", isAuth, joinProject);
router.get("/all-projects", isAuth, getAllProjects);
router.get("/project/:id", isAuth, getProject);
router.get("/collab-project", isAuth,  getCollaboratorProjects);
router.delete("/remove-collaborator", isAuth,  removeCollaborator);
router.post("/update-codes", isAuth, updateCodeFiles);
router.delete("/delete-project/:id", isAuth,  deleteProject)

module.exports = router;
