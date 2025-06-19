import React, { useState } from 'react';
import CircularProgressCountUp from './CircularProgressCountUp';
import { Search, CheckCircle, XCircle } from 'lucide-react'; // ✅ Import icons

const Results = ({ score, matchedSkills, missingSkills, matchedMessage }) => {
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Match Score */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
          <p className="text-lg font-semibold text-gray-900 mb-4">Match Score</p>
          <div className="flex flex-col items-center justify-center py-6">
            <CircularProgressCountUp score={score} />
            <p className="text-sm text-center mt-6 text-gray-600">{matchedMessage}</p>
          </div>
        </div>

        {/* Skill Analysis */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
            <p className="text-lg font-semibold text-gray-900 mb-4">Skill Analysis</p>

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
      </div>
    </div>
  );
};

export default Results;
