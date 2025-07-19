import React, { useState } from "react";
import { Circle, FileText, Upload, Briefcase, FileUp, X, CheckCircle2 } from "lucide-react";
import Results from "../components/Results.jsx";

const Analyse = () => {
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [jobDescriptionUploaded, setJobDescriptionUploaded] = useState(false);
  const [loading, setLoading] = useState(false);

  // State for backend data
  const [finalScore, setFinalScore] = useState(null);
  const [skillsScore, setSkillsScore] = useState(null);
  const [experienceScore, setExperienceScore] = useState(null);
  const [matchedSkills, setMatchedSkills] = useState([]);
  const [missingSkills, setMissingSkills] = useState([]);
  const [matchedMessage, setMatchedMessage] = useState("");
  const [experienceAnalysis, setExperienceAnalysis] = useState(null);
  const [error, setError] = useState(""); // For error message

  const [formData, setFormData] = useState({
    resume: null,
    jobDescription: null,
  });

  // Track if results are generated
  const resultsGenerated = finalScore !== null && !error;

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "jobDescription") {
      setJobDescriptionUploaded(true);
    } else if (name === "resume") {
      setResumeUploaded(true);
    }
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const resumeFile = formData.resume;
  const resumeName = resumeFile ? resumeFile.name : "";
  const resumeSize = resumeFile ? Math.round(resumeFile.size / 1024) + " KB" : "";

  const jdFile = formData.jobDescription;
  const jdName = jdFile ? jdFile.name : "";
  const jdSize = jdFile ? (jdFile.size / 1024).toFixed(2) + " KB" : "";

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error

    const data = new FormData();
    data.append("resume", formData.resume);
    data.append("jobDescription", formData.jobDescription);

    // Get token from localStorage
    const token = localStorage.getItem('jobfit_token');

    fetch("https://jobfit-dk4l.onrender.com/api/v1/model/analyse", {
      method: "POST",
      body: data,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((response) => {
        setLoading(false);
        if (response.success) {
          setFinalScore(response.finalScore);
          setSkillsScore(response.skillsScore);
          setExperienceScore(response.experienceScore);
          setMatchedSkills(response.matchedSkills);
          setMissingSkills(response.missingSkills);
          setMatchedMessage(response.message);
          setExperienceAnalysis(response.experienceAnalysis);
          setError("");
        } else {
          setError(response.message || "Oops! Something went wrong. Please wait 10 seconds before trying again.");
        }
      })
      .catch((error) => {
        setLoading(false);
        setError("Oops! Something went wrong. Please wait 10 seconds before trying again.");
      });
  };

  return (
    <div className="flex-grow container mx-auto px-2 sm:px-4 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Resume & Job Description Analyser
          </h1>
          <p className="text-gray-600">
            Upload your resume and a job description to get a detailed analysis of your skills match.
          </p>
        </div>
        {/* Progress Steps */}
        <div className="py-4 mb-8 mt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Upload Documents Step */}
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-2
                {resultsGenerated ? 'border-green-600 bg-green-50 text-green-600' : 'border-blue-600 bg-blue-50 text-blue-600'}">
                {resultsGenerated ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                ) : (
                  <div className="w-4 h-4 rounded-full bg-blue-600"></div>
                )}
              </div>
              <p className={`mt-2 text-sm font-medium ${resultsGenerated ? "text-green-600" : "text-blue-600"}`}>
                Upload Documents
              </p>
            </div>
            <div className={`flex-1 h-0.5 mx-2 ${resultsGenerated ? "bg-green-600" : jobDescriptionUploaded ? "bg-blue-600" : "bg-gray-300"} hidden sm:block`}></div>
            {/* Analysis Step */}
            <div className="flex flex-col items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${resultsGenerated ? "border-green-600 bg-green-50 text-green-600" : jobDescriptionUploaded ? "border-blue-600 bg-blue-50 text-blue-600" : "border-gray-300 text-gray-400"}`}>
                {resultsGenerated ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                ) : (
                  <div className={`w-4 h-4 ${jobDescriptionUploaded ? "bg-blue-600 border-none rounded-full" : "bg-gray-300 border-none rounded-full"}`}></div>
                )}
              </div>
              <p className={`mt-2 text-sm font-medium ${resultsGenerated ? "text-green-600" : jobDescriptionUploaded ? "text-blue-600" : "text-gray-500"}`}>
                Analysis
              </p>
            </div>
            <div className={`flex-1 h-0.5 mx-2 ${resultsGenerated ? "bg-green-600" : jobDescriptionUploaded ? "bg-blue-600" : "bg-gray-300"} hidden sm:block`}></div>
            {/* Results Step */}
            <div className="flex flex-col items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${resultsGenerated ? "border-green-600 bg-green-50 text-green-600" : "border-gray-300 text-gray-400"}`}>
                {resultsGenerated ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                ) : (
                  <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                )}
              </div>
              <p className={`mt-2 text-sm font-medium ${resultsGenerated ? "text-green-600" : "text-gray-500"}`}>Results</p>
            </div>
          </div>
        </div>

        {/* Show form only if results are not generated */}
        {!resultsGenerated && (
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            onSubmit={handleSubmit}
          >
            {/* resume upload */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-blue-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center">
                  <FileText className="text-blue-600 mr-2" />
                  <p className="font-semibold text-gray-900">Resume</p>
                </div>
              </div>
              {resumeUploaded ? (
                <div className="p-6 mx-auto">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <FileUp className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-3 truncate">
                        <p className="text-sm font-medium text-gray-900">
                          {resumeName}
                        </p>
                        <p className="text-xs text-gray-500">{resumeSize}</p>
                      </div>
                    </div>
                    <div className="ml-2 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-red-500">
                      <X className="w-5 h-5" onClick={() => setResumeUploaded(false)} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 mx-auto">
                  {/* Custom file upload area */}
                  <label
                    htmlFor="resume"
                    className="block cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors"
                  >
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-3">
                      <Upload className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="mx-auto flex flex-col items-center">
                      <p className="text-sm text-gray-600">
                        <span className="text-blue-600 cursor-pointer font-medium">
                          Click to Upload
                        </span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PDF (Max 5MB)</p>
                    </div>
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
            {/* job description upload */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-purple-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center">
                  <Briefcase className="text-purple-600 mr-2" />
                  <p className="font-semibold text-gray-900">Job Description</p>
                </div>
              </div>
              {jobDescriptionUploaded ? (
                <div className="p-6 mx-auto">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                        <FileUp className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="ml-3 truncate">
                        <p className="text-sm font-medium text-gray-900">
                          {jdName}
                        </p>
                        <p className="text-xs text-gray-500">{jdSize}</p>
                      </div>
                    </div>
                    <div className="ml-2 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-red-500 cursor-pointer">
                      <X className="w-5 h-5" onClick={() => setJobDescriptionUploaded(false)} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 mx-auto">
                  {/* Custom file upload area */}
                  <label
                    htmlFor="jd"
                    className="block cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors"
                  >
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 mb-3">
                      <Upload className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="mx-auto flex flex-col items-center">
                      <p className="text-sm text-gray-600">
                        <span className="text-purple-600 cursor-pointer font-medium">
                          Click to Upload
                        </span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PDF (Max 5MB)</p>
                    </div>
                    <input
                      type="file"
                      id="jd"
                      name="jobDescription"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
            {/* Submit button centered and full width on mobile */}
            <div className="flex justify-center mt-2 col-span-1 md:col-span-2">
              <button
                type="submit"
                className={`w-full md:w-auto font-semibold py-3 px-6 rounded-lg transition-colors ${
                  resumeUploaded && jobDescriptionUploaded
                    ? "bg-blue-600 text-white cursor-pointer hover:bg-blue-700"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
                disabled={!(resumeUploaded && jobDescriptionUploaded) || loading}
              >
                {loading ? "Analysing..." : "Analyse Match"}
              </button>
            </div>
          </form>
        )}

        {/* Results section: only show after backend data is received */}
        <div className="mt-8">
          {error ? (
            <div className="text-center text-red-600 font-semibold text-lg">
              {error}
            </div>
          ) : resultsGenerated ? (
            <Results
              finalScore={finalScore}
              skillsScore={skillsScore}
              experienceScore={experienceScore}
              matchedSkills={matchedSkills}
              missingSkills={missingSkills}
              matchedMessage={matchedMessage}
              experienceAnalysis={experienceAnalysis}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Analyse;