import React from 'react';

interface InputPanelProps {
  inputData: string;
  setInputData: (data: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const InputPanel: React.FC<InputPanelProps> = ({
  inputData,
  setInputData,
  onGenerate,
  isLoading,
}) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col h-full">
      <label htmlFor="company-data" className="block text-lg font-semibold mb-3 text-gray-100">
        Company Inquiry
      </label>
      <p className="text-sm text-gray-400 mb-4">
        Paste unstructured company data, or simply enter a company name. The AI will use Google Search to find and analyze the latest information.
      </p>
      <textarea
        id="company-data"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        placeholder="e.g., 'Smokvina d.o.o. za turizam, Solin' or paste raw data..."
        className="flex-grow w-full p-4 bg-gray-900 border border-gray-700 rounded-md text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all duration-200 resize-none"
        rows={20}
      />
      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="mt-6 w-full flex justify-center items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold py-3 px-4 rounded-md transition-all duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed transform hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-brand-primary"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing...
          </>
        ) : (
          'Generate Report'
        )}
      </button>
    </div>
  );
};

export default InputPanel;