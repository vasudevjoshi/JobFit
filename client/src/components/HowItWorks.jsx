import React from "react";
import { FileText } from "lucide-react";
const HowItWorks = () => {
  return (
    <div className=" w-11/12 mx-auto py-16">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-12 mx-auto">
        How It Works
      </h1>
      <div className="grid grid-cols-3 gap-4 mx-auto px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-7 mx-auto">
            <FileText className="text-blue-600" />
          </div>
          <h1 className="text-xl font-semibold mb-2">Upload Documents</h1>
          <p className="text-gray-600">
            Upload the resume and the job description you are interested in
          </p>
        </div>

        <div className="text-center mx-auto">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-7 mx-auto">
            <FileText className="text-blue-600" />
          </div>
          <h1 className="text-xl font-semibold mb-2">AI Analysis</h1>
          <p className="text-gray-600">
           Our AI analyzes both documents and identifies skill matches and gaps.
          </p>
        </div>

        <div className="text-center mx-auto">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-7 mx-auto">
            <FileText className="text-blue-600" />
          </div>
          <h1 className="text-xl font-semibold mb-2">Get Results</h1>
          <p className="text-gray-600">
            Receive detailed feedback and suggestions for improvement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
