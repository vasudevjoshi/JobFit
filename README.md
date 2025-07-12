# 💼 JobFit — AI-Powered Resume & Job Description Analyzer

JobFit is an AI-based web application that analyzes and compares a resume against a job description (JD). It scores the resume based on matching skills and suggests resources to bridge the skill gap, helping users become a better fit for the desired role.

## 🔍 Live Demo
🌐 [Try JobFit Now](https://adorable-tapioca-e0ee6d.netlify.app/)

---

## 🚀 Features

- 🔍 **Resume vs JD Matching** – Upload a resume and job description to get a detailed skill comparison.
- 📊 **Scoring System** – Calculates a matching percentage based on relevant skills.
- 🧠 **AI-Powered Suggestions** – Provides personalized YouTube video links to learn missing skills.
- ✅ **Skill Breakdown** – Shows matched and unmatched skills for better clarity.
- 📄 **PDF & Text Support** – Supports common resume and JD formats.

---

## 🛠 Tech Stack

**Frontend:**
- React.js
- Tailwind CSS

**Backend:**
- Node.js
- Express.js

**AI Integration:**
- llama API(for skill extraction and comparison)

**Other Tools:**
- YouTube Search API (for learning resources)

---

## 📂 Folder Structure

```
jobfit/
├── client/            # React frontend
│   ├── components/
│   ├── pages/
│   └── ...
├── server/            # Node.js backend
│   ├── routes/
│   ├── controllers/
│   └── ...
├── .env
└── README.md
```

---

## ⚙️ How to Run Locally

### Prerequisites:
- Node.js
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/vasudevjoshi/jobfit.git
cd jobfit
```

### 2. Install dependencies

```bash
cd client
npm install

cd ../server
npm install
```

### 3. Add environment variables

Create a `.env` file in the `server/` folder with:
```env
PORT=5000
Llama_API_KEY=your_api_key
YOUTUBE_API_KEY=your_youtube_api_key
```

### 4. Run the app

```bash
# In one terminal
cd server
npm run dev

# In another terminal
cd client
npm start
```

---

## ✨ How It Works

1. User uploads resume and job description.
2. AI extracts skills from both.
3. Compares skill sets and calculates matching percentage.
4. Displays matching and missing skills.
5. Suggests YouTube videos to learn missing skills.

---

## 📈 Future Enhancements

- Login/Signup functionality
- Save and track resume scores
- Admin dashboard for recruiters
- Integration with LinkedIn profiles

---

## 👨‍💻 Developed By

**Vasudev Joshi**  
🔗 [GitHub](https://github.com/vasudevjoshi)  

---
