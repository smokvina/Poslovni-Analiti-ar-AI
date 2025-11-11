import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import InputPanel from './components/InputPanel';
import ReportDisplay from './components/ReportDisplay';
import { generateBusinessReport } from './services/geminiService';
import { DEFAULT_INPUT_DATA } from './constants';

const App: React.FC = () => {
  const [inputData, setInputData] = useState<string>(DEFAULT_INPUT_DATA);
  const [report, setReport] = useState<string>('');
  const [citations, setCitations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateReport = useCallback(async () => {
    if (!inputData.trim()) {
      setError('Please enter company data to analyze.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setReport('');
    setCitations([]);

    try {
      const result = await generateBusinessReport(inputData);
      setReport(result.reportText);
      setCitations(result.citations || []);
    } catch (e) {
      console.error(e);
      setError('An error occurred while generating the report. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [inputData]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2 flex flex-col">
          <InputPanel
            inputData={inputData}
            setInputData={setInputData}
            onGenerate={handleGenerateReport}
            isLoading={isLoading}
          />
        </div>
        <div className="lg:w-1/2 flex flex-col">
          <ReportDisplay
            report={report}
            isLoading={isLoading}
            error={error}
            citations={citations}
          />
        </div>
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm space-y-1">
        <p>Powered by Gemini 2.5 Flash with Google Search</p>
        <p>
          Created by{' '}
          <a
            href="https://wa.me/38598667806"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-secondary hover:underline"
          >
            AppsBYDenisOrlić
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;