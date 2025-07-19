import React, { useState } from 'react';
import CircularProgressCountUp from './CircularProgressCountUp';
import { Search, CheckCircle, XCircle, Award, Briefcase } from 'lucide-react'; // ✅ Import icons

const Results = ({ 
  finalScore, 
  skillsScore, 
  experienceScore, 
  matchedSkills, 
  missingSkills, 
  matchedMessage,
  experienceAnalysis 
}) => {
  const [searchSkills, setSearchSkills] = useState('');
  const [active, setActive] = useState('All');

  const handleChange = (e) => {
    setSearchSkills(e.target.value);
  };

  const allSkills = [
    ...matchedSkills.map(skill => ({ skill, matched: true })),
    ...missingSkills.map(skill => ({ skill, matched: false }))
  ];

  const filteredSkills = allSkills.filter(({ skill, matched }) => {
    const matchActive =
      active === 'All' ||
      (active === 'Matched' && matched) ||
      (active === 'Unmatched' && !matched);

    const matchSearch = skill.toLowerCase().includes(searchSkills.toLowerCase());

    return matchActive && matchSearch;
  });

  return (
    <div className="space-y-8">
      {/* Score Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Overall Score */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-lg font-semibold text-gray-900">Overall Score</p>
            <Award className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex flex-col items-center justify-center">
            <CircularProgressCountUp score={finalScore} />
            <p className="text-sm text-center mt-4 text-gray-600">{matchedMessage}</p>
          </div>
        </div>

        {/* Skills Score */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-lg font-semibold text-gray-900">Skills Match</p>
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-green-600">{skillsScore}%</div>
            <p className="text-sm text-gray-600 mt-2">Technical & Soft Skills</p>
          </div>
        </div>

        {/* Experience Score */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-lg font-semibold text-gray-900">Experience</p>
            <Briefcase className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-purple-600">{experienceScore}%</div>
            <p className="text-sm text-gray-600 mt-2">Years of Experience</p>
          </div>
        </div>

        {/* Experience Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-lg font-semibold text-gray-900">Experience Details</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Required:</span>
              <span className="text-sm font-medium">{experienceAnalysis?.required || 0}+ years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Candidate:</span>
              <span className="text-sm font-medium">{experienceAnalysis?.candidate || 0} years</span>
            </div>
            <div className="mt-3">
              <p className="text-xs text-gray-500">{experienceAnalysis?.status}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Skill Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <p className="text-lg font-semibold text-gray-900 mb-4">Detailed Skill Analysis</p>

        {/* Filter and Search */}
        <div className="mb-4 flex flex-col sm:flex-row gap-x-3 h-12">
          <div className="relative flex-grow">
            <label htmlFor="search" className="absolute text-gray-400 top-3 left-2 z-10">
              <Search />
            </label>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search skills.."
              className="block w-full h-12 pl-10 pr-3 border border-gray-300 rounded-lg
                bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchSkills}
              onChange={handleChange}
            />
          </div>
          <div className="inline-flex shadow-sm rounded-md h-12">
            <button
              className={`h-12 px-4 text-sm font-medium rounded-l-lg border border-gray-300
                ${active === "All" ? "bg-blue-600 text-white" : "bg-white text-blue-600"}`}
              onClick={() => setActive("All")}
            >
              All
            </button>
            <button
              className={`h-12 px-4 text-sm font-medium border-t border-b border-gray-300
                ${active === "Matched" ? "bg-green-600 text-white" : "bg-white text-green-600"}`}
              onClick={() => setActive("Matched")}
            >
              Matched
            </button>
            <button
              className={`h-12 px-4 text-sm font-medium rounded-r-lg border border-gray-300
                ${active === "Unmatched" ? "bg-red-600 text-white" : "bg-white text-red-600"}`}
              onClick={() => setActive("Unmatched")}
            >
              Unmatched
            </button>
          </div>
        </div>

        {/* Skills Display */}
        <div className="grid grid-cols-2 gap-3 h-60 overflow-y-auto pr-2">
          {filteredSkills.length > 0 ? (
            filteredSkills.map(({ skill, matched }, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm border text-sm font-medium
                  ${matched ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
              >
                {/* Icon */}
                <span className="rounded-full p-1">
                  {matched ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                </span>
                {/* Skill Name */}
                {skill}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm col-span-2">No skills found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
