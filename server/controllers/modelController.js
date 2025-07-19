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

function compareSkillsAndExperience(jdSkillsRaw, resumeSkillsRaw, jdExperience, resumeExperience) {
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

  // Step 4: Calculate Skills Score (70% weight)
  const matchCount = matchedSkills.length;
  const totalJD = jdSet.size;
  const skillsScore = totalJD > 0 ? Math.round((matchCount / totalJD) * 100) : 0;

  // Step 5: Calculate Experience Score (30% weight)
  let experienceScore = 0;
  let experienceStatus = '';
  
  if (jdExperience === 0) {
    // No experience required
    experienceScore = 100;
    experienceStatus = 'No specific experience required';
  } else if (resumeExperience >= jdExperience) {
    // Meets or exceeds experience requirement
    experienceScore = 100;
    experienceStatus = `Meets requirement (${resumeExperience}+ years vs ${jdExperience}+ required)`;
  } else if (resumeExperience >= jdExperience * 0.8) {
    // Close to requirement (80% or more)
    experienceScore = 80;
    experienceStatus = `Close to requirement (${resumeExperience} years vs ${jdExperience}+ required)`;
  } else if (resumeExperience >= jdExperience * 0.5) {
    // Partial experience (50-80%)
    experienceScore = 50;
    experienceStatus = `Below requirement (${resumeExperience} years vs ${jdExperience}+ required)`;
  } else {
    // Significantly below requirement
    experienceScore = 20;
    experienceStatus = `Significantly below requirement (${resumeExperience} years vs ${jdExperience}+ required)`;
  }

  // Step 6: Calculate Final Score (Skills: 70%, Experience: 30%)
  const finalScore = Math.round((skillsScore * 0.7) + (experienceScore * 0.3));

  // Step 7: Generate match message
  let matchMessage = '';
  if (finalScore >= 80) {
    matchMessage = "Excellent match! You have strong skills and meet the experience requirements.";
  } else if (finalScore >= 65) {
    matchMessage = "Good match! You have most required skills with adequate experience.";
  } else if (finalScore >= 50) {
    matchMessage = "Decent match, but there's room for improvement in skills or experience.";
  } else {
    matchMessage = "Your profile doesn't strongly match this job. Consider gaining more experience or developing required skills.";
  }

  // Step 8: Return enhanced result
  return {
    matched: matchedSkills,
    unmatched: jdOnly,
    skillsScore: skillsScore,
    experienceScore: experienceScore,
    finalScore: finalScore,
    resumeOnly: resumeOnly,
    message: matchMessage,
    experienceAnalysis: {
      required: jdExperience,
      candidate: resumeExperience,
      status: experienceStatus
    }
  };
}

function extractExperienceYears(text) {
  // Common patterns for experience requirements
  const patterns = [
    /(\d+)\+?\s*(?:years?|yrs?)\s*(?:of\s*)?(?:experience|exp)/gi,
    /(\d+)\s*to\s*(\d+)\s*(?:years?|yrs?)/gi,
    /minimum\s*(?:of\s*)?(\d+)\s*(?:years?|yrs?)/gi,
    /at\s*least\s*(\d+)\s*(?:years?|yrs?)/gi,
    /(\d+)\s*(?:years?|yrs?)\s*(?:minimum|min)/gi,
    /experience.*?(\d+)\+?\s*(?:years?|yrs?)/gi,
    /(\d+)\+?\s*(?:years?|yrs?).*?experience/gi
  ];

  let maxExperience = 0;
  
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const years = parseInt(match[1]);
      if (!isNaN(years) && years > maxExperience) {
        maxExperience = years;
      }
      // For range patterns like "2 to 5 years"
      if (match[2]) {
        const endYears = parseInt(match[2]);
        if (!isNaN(endYears) && endYears > maxExperience) {
          maxExperience = endYears;
        }
      }
    }
  }
  
  return maxExperience;
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

async function extractExperienceWithGroq(text, type) {
  const prompt = `Extract the total years of experience mentioned in the following ${type}. Look for phrases like "X years of experience", "X+ years", "X-Y years experience", etc. Return only the number of years as a single number. If multiple experiences are mentioned, return the highest number. If no clear experience is mentioned, return 0.\n\n${text}`;

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

  // Extract years and convert to number
  const experienceText = response.data.choices[0].message.content.trim();
  const experienceYears = parseInt(experienceText) || 0;
  return experienceYears;
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
    let jdExperience = 0;
    let resumeExperience = 0;

    for (let i = 0; i < 2; i++) {
      const file = i === 0 ? jdFile : resumeFile;
      const type = i === 0 ? "job description" : "resume";

      // Parse the PDF file
      const dataBuffer = file.data;
      const pdfData = await pdfParse(dataBuffer);
      const text = pdfData.text;
      
      // Extract skills and experience using Groq
      if (text) {
        if (i === 0) {
          jdSkillsRaw = await extractSkillsWithGroq(text, type);
          jdExperience = await extractExperienceWithGroq(text, type);
        } else {
          resumeSkillsRaw = await extractSkillsWithGroq(text, type);
          resumeExperience = await extractExperienceWithGroq(text, type);
        }
      }
    }

    // Use the enhanced comparison function
    const {
      matched,
      unmatched,
      skillsScore,
      experienceScore,
      finalScore,
      resumeOnly,
      message: matchMessage,
      experienceAnalysis
    } = compareSkillsAndExperience(jdSkillsRaw, resumeSkillsRaw, jdExperience, resumeExperience);

    res.status(200).json({
      success: true,
      finalScore: finalScore,
      skillsScore: skillsScore,
      experienceScore: experienceScore,
      matchedSkills: matched,
      missingSkills: unmatched,
      resumeOnlySkills: resumeOnly,
      message: matchMessage,
      experienceAnalysis: experienceAnalysis
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