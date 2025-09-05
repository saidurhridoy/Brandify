import React, { useState, useMemo, useEffect } from 'react';

interface FlipbookViewerProps {
  issueTitle: string;
  coverUrl: string;
  pages?: string[];
  onClose: () => void;
}

const FlipbookViewer: React.FC<FlipbookViewerProps> = ({ issueTitle, coverUrl, pages = [], onClose }) => {
  const allPages = useMemo(() => [coverUrl, ...pages].filter(Boolean), [coverUrl, pages]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const goToNextPage = () => {
    if (currentPage < allPages.length - 1) {
      setIsLoading(true);
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setIsLoading(true);
      setCurrentPage(currentPage - 1);
    }
  };
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if(e.key === 'ArrowRight') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft') {
        goToPrevPage();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, allPages.length]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
      <div className="bg-white p-4 rounded-lg shadow-2xl relative w-full max-w-4xl h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center border-b pb-2 mb-4 flex-shrink-0">
          <h3 className="text-xl font-bold text-brand-dark">{issueTitle}</h3>
          <button onClick={onClose} className="bg-gray-200 rounded-full p-1 text-gray-800 hover:bg-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="relative w-full flex-grow flex items-center justify-center min-h-0">
          {/* Page Display */}
          <div className="w-full h-full relative">
              {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white z-20">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-primary"></div>
                  </div>
              )}
              <img
                src={allPages[currentPage]}
                alt={`Page ${currentPage + 1}`}
                className="w-full h-full object-contain transition-opacity duration-300"
                onLoad={() => setIsLoading(false)}
                style={{ opacity: isLoading ? 0 : 1 }}
              />
          </div>

          {/* Navigation */}
          {currentPage > 0 && (
            <button 
              onClick={goToPrevPage} 
              className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full p-3 hover:bg-opacity-60 z-30 transition-all text-2xl"
              aria-label="Previous Page"
            >
              &#x276E;
            </button>
          )}
          {currentPage < allPages.length - 1 && (
            <button 
              onClick={goToNextPage} 
              className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full p-3 hover:bg-opacity-60 z-30 transition-all text-2xl"
              aria-label="Next Page"
            >
              &#x276F;
            </button>
          )}
        </div>

        <div className="text-center font-semibold text-gray-600 pt-2 flex-shrink-0">
          Page {currentPage + 1} of {allPages.length}
        </div>
      </div>
    </div>
  );
};

export default FlipbookViewer;
