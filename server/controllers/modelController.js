const pdfParse = require("pdf-parse");
const axios = require("axios");

require("dotenv").config();
const GROQ_MODEL = "llama3-8b-8192";

// Store the timestamp of the last response
let lastResponseTime = 0;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function compareSkills(jdSkillsRaw, resumeSkillsRaw) {
  const cleanSkill = (skill) =>
    skill
      .replace(/^[-•\d.\s]+/, '') // remove bullets or numbering
      .replace(/[()]/g, '') // remove brackets
      .replace(/&/g, 'and') // normalize symbols
      .toLowerCase()
      .trim();

  // Skip the heading line
  const jdSkills = jdSkillsRaw.slice(1).map(cleanSkill);
  const resumeSkills = resumeSkillsRaw.slice(1).map(cleanSkill);

  // Step 2: Create Sets
  const jdSet = new Set(jdSkills);
  const resumeSet = new Set(resumeSkills);

  // Step 3: Compare skills
  const matchedSkills = [...jdSet].filter(skill => resumeSet.has(skill));
  const jdOnly = [...jdSet].filter(skill => !resumeSet.has(skill));
  const resumeOnly = [...resumeSet].filter(skill => !jdSet.has(skill));

  // Step 4: Calculate Score
  const matchCount = matchedSkills.length;
  const totalJD = jdSet.size;
  const score = Math.round((matchCount / totalJD) * 100);

  // Step 5: Generate match message
  let matchMessage = '';
  if (score >= 70) {
    matchMessage = "You have a strong match with this job description!";
  } else if (score >= 50) {
    matchMessage = "You have a decent match, but there’s room for improvement.";
  } else {
    matchMessage = "Your resume doesn't strongly match this job description. Consider improving your skills alignment.";
  }

  // Step 6: Return result
  return {
    matched: matchedSkills,
    unmatched: jdOnly,
    score: score,
    resumeOnly: resumeOnly,
    message: matchMessage
  };
}

async function extractSkillsWithGroq(text, type) {
  const prompt = `Extract all actual skills (both technical and soft skills) mentioned in the following ${type}. Return only the list of skill names as plain text, one skill per line. Do not include any explanations or extra text.\n\n${text}`;

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: GROQ_MODEL,
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
    }
  );

  // Convert to skill array
  return response.data.choices[0].message.content
    .split("\n")
    .map((skill) => skill.trim())
    .filter((skill) => skill);
}

const getResponse = async (req, res) => {
  try {
    const now = Date.now();
    if (now - lastResponseTime < 10000) { // 10 seconds = 10000 ms
      const waitTime = Math.ceil((10000 - (now - lastResponseTime)) / 1000);
      return res.status(429).json({
        success: false,
        message: `Please wait ${waitTime} more second(s) before making another request.`,
      });
    }

    lastResponseTime = now; // Update the last response time

    const jdFile = req.files?.jobDescription;
    const resumeFile = req.files?.resume;
    if (!jdFile || !resumeFile) {
      return res.status(400).json({
        success: false,
        message: "Please upload both JD and Resume files"
      });
    }
    let jdSkillsRaw = [];
    let resumeSkillsRaw = [];

    for (let i = 0; i < 2; i++) {
      const file = i === 0 ? jdFile : resumeFile;
      const type = i === 0 ? "job description" : "resume";

      // Parse the PDF file
      const dataBuffer = file.data;
      const pdfData = await pdfParse(dataBuffer);
      const text = pdfData.text;
      // Extract skills using Groq
      if (text) {
        if (i === 0) {
          jdSkillsRaw = await extractSkillsWithGroq(text, type);
        } else {
          resumeSkillsRaw = await extractSkillsWithGroq(text, type);
        }
      }
    }

    const { matched, unmatched, score, resumeOnly, message: matchMessage } = compareSkills(jdSkillsRaw, resumeSkillsRaw);

    res.status(200).json({
      success: true,
      score,
      matchedSkills: matched,
      missingSkills: unmatched,
      resumeOnlySkills: resumeOnly,
      message: matchMessage
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while analysing the files: " + error.message,
    });
  }
};

module.exports = {
  getResponse,
};