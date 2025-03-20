import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Users, Share2, Award, AlertCircle } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  position: string;
  stats: {
    goals: number;
    assists: number;
    yellowCards: number;
    redCards: number;
  };
}

const GameManager = () => {
  const { id } = useParams();
  const [players, setPlayers] = useState<Player[]>([]);
  const [shareUrl] = useState(`${window.location.origin}/game/${id}/join`);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  const updatePlayerStats = (playerId: string, stat: keyof Player['stats']) => {
    setPlayers(players.map(player => {
      if (player.id === playerId) {
        return {
          ...player,
          stats: {
            ...player.stats,
            [stat]: player.stats[stat] + 1
          }
        };
      }
      return player;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Game Manager</h1>
        <button
          onClick={handleCopyLink}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          <Share2 className="w-4 h-4" />
          <span>Share Game</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span>Team A</span>
            </h2>
            {/* Player list would go here */}
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span>Team B</span>
            </h2>
            {/* Player list would go here */}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <Award className="w-5 h-5 text-blue-600" />
          <span>Game Stats</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">0</div>
            <div className="text-sm text-gray-600">Goals</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">0</div>
            <div className="text-sm text-gray-600">Assists</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-yellow-500">0</div>
            <div className="text-sm text-gray-600">Yellow Cards</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-red-600">0</div>
            <div className="text-sm text-gray-600">Red Cards</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameManager;