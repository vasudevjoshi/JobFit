import React from 'react'
import CircularProgressCountUp from './CircularProgressCountUp';
const Results = ({ score, matchedSkills, missingSkills, matchedMessage }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
        <p className="text-lg font-semibold text-gray-900 mb-4">Match Score</p>
        <div className="flex flex-col items-center justify-center py-6">
          {/* Circular progress bar with animated count up */}
          <CircularProgressCountUp score={score} />
          <p className="text-sm text-center mt-6 text-gray-600">{matchedMessage}</p>
        </div>
      </div>
    </div>
  )
}

export default Results;