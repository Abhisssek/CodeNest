const { GoogleGenerativeAI } = require("@google/generative-ai");
const AIUsage = require("../models/aiUsageSchema");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateCode = async (req, res) => {
  const { prompt } = req.body;
  const userId = req.user.id;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const code = response.text();

    // Save usage
    const usage = new AIUsage({
      user: userId,
      prompt,
      response: code,
    });
    await usage.save();

    res.status(200).json({ code });
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: "Failed to generate code" });
  }
};
