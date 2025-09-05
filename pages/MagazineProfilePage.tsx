import React, { useState, useEffect } from 'react';
import { Magazine, MagazineIssue } from '../types';
import { GoogleGenAI } from "@google/genai";
import FlipbookViewer from '../components/FlipbookViewer';

interface MagazineProfilePageProps {
  magazine: Magazine;
  onBookAd: (magazine: Magazine) => void;
  onBack: () => void;
}

const MagazineProfilePage: React.FC<MagazineProfilePageProps> = ({ magazine, onBookAd, onBack }) => {
  const [selectedIssue, setSelectedIssue] = useState<MagazineIssue | null>(null);
  const [generatedCovers, setGeneratedCovers] = useState<Record<string, string>>({});
  const [generatingCovers, setGeneratingCovers] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const generateCover = async (issue: MagazineIssue) => {
      // Prevent re-fetching
      if (generatingCovers[issue.id] || generatedCovers[issue.id]) return;

      setGeneratingCovers(prev => ({ ...prev, [issue.id]: true }));
      try {
        const prompt = `A professional, stylish magazine cover for '${magazine.name}'. Category: ${magazine.category}. Issue date: ${issue.date}. Style: modern, artistic, visually striking. No text on the cover.`;
        const response = await ai.models.generateImages({
          model: 'imagen-4.0-generate-001',
          prompt: prompt,
          config: {
            numberOfImages: 1,
            outputMimeType: 'image/jpeg',
            aspectRatio: '3:4',
          },
        });
        const base64ImageBytes = response.generatedImages[0].image.imageBytes;
        const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
        setGeneratedCovers(prev => ({ ...prev, [issue.id]: imageUrl }));
      } catch (err) {
        console.error(`Failed to generate cover for issue ${issue.id}:`, err);
        // Optionally set an error state here to show in the UI
      } finally {
        setGeneratingCovers(prev => ({ ...prev, [issue.id]: false }));
      }
    };
    
    magazine.issues.forEach(issue => {
      if (!issue.coverUrl) {
        generateCover(issue);
      }
    });
  // The dependency array is complex. For this use case, we only want to run this on mount for the given magazine.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [magazine.id, magazine.issues]);
  
  const getCoverSrc = (issue: MagazineIssue) => issue.coverUrl || generatedCovers[issue.id];


  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg animate-fade-in">
      <button onClick={onBack} className="mb-6 text-brand-primary hover:underline">
        &larr; Back to all magazines
      </button>

      {/* Magazine Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-8">
        <img src={magazine.thumbnailUrl} alt={magazine.name} className="w-48 h-64 object-cover rounded-md shadow-md flex-shrink-0" />
        <div>
          <span className="inline-block bg-brand-secondary text-white text-sm font-semibold px-3 py-1 rounded-full uppercase mb-2">{magazine.category}</span>
          <h1 className="text-4xl font-bold text-brand-dark">{magazine.name}</h1>
          <p className="text-gray-600 mt-2 max-w-2xl">{magazine.description}</p>
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onBookAd(magazine)}
              className="px-6 py-3 bg-brand-primary text-white font-bold rounded-md hover:bg-blue-800 transition-colors duration-300 shadow-md"
            >
              Book an Ad in This Magazine
            </button>
            <a href={magazine.mediaKitUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-brand-primary text-brand-primary font-bold rounded-md hover:bg-blue-50 transition-colors duration-300 text-center">
              Download Media Kit
            </a>
          </div>
        </div>
      </div>

      {/* Archive Section */}
      <div>
        <h2 className="text-3xl font-bold text-brand-dark border-b-2 border-gray-200 pb-2 mb-6">Digital Issues Archive</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {magazine.issues.map(issue => {
            const coverSrc = getCoverSrc(issue);
            const isGenerating = generatingCovers[issue.id];
            return (
              <div key={issue.id} className="text-center cursor-pointer group" onClick={() => setSelectedIssue(issue)}>
                <div className="w-full aspect-[3/4] rounded-md shadow-lg transform group-hover:scale-105 group-hover:shadow-xl transition-all duration-300 overflow-hidden bg-gray-200">
                  {isGenerating ? (
                    <div className="w-full h-full flex items-center justify-center animate-pulse bg-gray-300">
                      <span className="text-xs text-gray-500 p-2 text-center">AI Generating Cover...</span>
                    </div>
                  ) : coverSrc ? (
                    <img src={coverSrc} alt={`Cover for ${issue.date}`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <span className="text-xs text-gray-400">No Preview</span>
                    </div>
                  )}
                </div>
                <p className="mt-2 font-semibold text-gray-700">{issue.date}</p>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Issue Viewer Modal */}
      {selectedIssue && (
        <FlipbookViewer
          issueTitle={`${magazine.name} - ${selectedIssue.date}`}
          coverUrl={getCoverSrc(selectedIssue) || ''}
          pages={selectedIssue.pages}
          onClose={() => setSelectedIssue(null)}
        />
      )}
    </div>
  );
};

export default MagazineProfilePage;