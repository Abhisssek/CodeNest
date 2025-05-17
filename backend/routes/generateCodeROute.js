const express = require("express");
const router = express.Router();
const { generateCode } = require("../controllers/generateCode");
const isAuth = require("../middleware/authMiddleware"); // ensure user is logged in

// POST /api/ai/generate
router.post("/generate", isAuth, generateCode);

module.exports = router;
