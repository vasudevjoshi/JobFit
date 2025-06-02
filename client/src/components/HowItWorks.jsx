import React from "react";
import { FileText } from "lucide-react";
const HowItWorks = () => {
  return (
    <div className="w-11/12 mx-auto py-10 sm:py-16">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12 mx-auto">
        How It Works
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-6 mx-auto px-2 sm:px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-5 sm:mb-7 mx-auto">
            <FileText className="text-blue-600" />
          </div>
          <h1 className="text-lg sm:text-xl font-semibold mb-2">Upload Documents</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Upload the resume and the job description you are interested in
          </p>
        </div>

        <div className="text-center mx-auto">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-5 sm:mb-7 mx-auto">
            <FileText className="text-blue-600" />
          </div>
          <h1 className="text-lg sm:text-xl font-semibold mb-2">AI Analysis</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Our AI analyzes both documents and identifies skill matches and gaps.
          </p>
        </div>

        <div className="text-center mx-auto">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-5 sm:mb-7 mx-auto">
            <FileText className="text-blue-600" />
          </div>
          <h1 className="text-lg sm:text-xl font-semibold mb-2">Get Results</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Receive detailed feedback and suggestions for improvement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;