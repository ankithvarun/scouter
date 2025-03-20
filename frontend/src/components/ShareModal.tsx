import React from 'react';
import { Share2, Copy, Check } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameDetails: {
    time: string;
    location: string;
    teamAName: string;
    teamBName: string;
  };
  links: {
    teamA: string;
    teamB: string;
  };
}

const ShareModal = ({ isOpen, onClose, gameDetails, links }: ShareModalProps) => {
  const [copiedTeam, setCopiedTeam] = React.useState<'A' | 'B' | null>(null);

  const handleCopy = async (team: 'A' | 'B', link: string) => {
    await navigator.clipboard.writeText(link);
    setCopiedTeam(team);
    setTimeout(() => setCopiedTeam(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Share Game</h3>
          <Share2 className="w-5 h-5 text-blue-600" />
        </div>
        
        <p className="text-gray-600 mb-6">
          Join this game on {new Date(gameDetails.time).toLocaleDateString()} at{' '}
          {new Date(gameDetails.time).toLocaleTimeString()} in {gameDetails.location}
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {gameDetails.teamAName} Link
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                readOnly
                value={links.teamA}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
              />
              <button
                onClick={() => handleCopy('A', links.teamA)}
                className="p-2 text-blue-600 hover:text-blue-700 transition-colors"
                title="Copy link"
              >
                {copiedTeam === 'A' ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {gameDetails.teamBName} Link
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                readOnly
                value={links.teamB}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
              />
              <button
                onClick={() => handleCopy('B', links.teamB)}
                className="p-2 text-blue-600 hover:text-blue-700 transition-colors"
                title="Copy link"
              >
                {copiedTeam === 'B' ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ShareModal;