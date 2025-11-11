import React from 'react';

interface ReportDisplayProps {
  report: string;
  isLoading: boolean;
  error: string | null;
  citations: any[];
}

const LoadingSkeleton: React.FC = () => (
  <div className="space-y-6 animate-pulse">
    <div className="h-6 bg-gray-700 rounded w-1/3"></div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-700 rounded w-full"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6"></div>
      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
    </div>
    <div className="h-6 bg-gray-700 rounded w-1/4"></div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-700 rounded w-full"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
    </div>
     <div className="h-6 bg-gray-700 rounded w-1/4"></div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-700 rounded w-full"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6"></div>
    </div>
  </div>
);

const ReportDisplay: React.FC<ReportDisplayProps> = ({ report, isLoading, error, citations }) => {
  const renderContent = () => {
    if (isLoading) {
      return <LoadingSkeleton />;
    }
    if (error) {
      return (
        <div className="text-center text-red-400">
          <h3 className="text-lg font-semibold">Error</h3>
          <p>{error}</p>
        </div>
      );
    }
    if (report) {
      return (
        <>
          <div className="prose prose-invert prose-headings:text-brand-primary prose-a:text-brand-secondary">
              <pre className="whitespace-pre-wrap font-sans text-gray-300">{report}</pre>
          </div>
          {citations && citations.length > 0 && (
            <div className="mt-8 pt-4 border-t border-gray-700">
              <h3 className="text-lg font-semibold text-brand-primary mb-3">Sources</h3>
              <ul className="space-y-2 list-disc list-inside">
                {citations.map((chunk, index) => {
                  const source = chunk.web || chunk.maps;
                  if (!source || !source.uri) return null;
                  return (
                    <li key={index}>
                      <a 
                        href={source.uri} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-brand-secondary hover:underline break-words"
                        title={source.title}
                      >
                        {source.title || source.uri}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </>
      );
    }
    return (
      <div className="text-center text-gray-500">
        <h3 className="text-lg font-semibold">Report Output</h3>
        <p>Your generated company analysis report will appear here.</p>
      </div>
    );
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col h-full">
      <div className="overflow-y-auto h-full pr-2">
        {renderContent()}
      </div>
    </div>
  );
};

export default ReportDisplay;