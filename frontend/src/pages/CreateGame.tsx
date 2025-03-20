import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, MapPin, Clock } from 'lucide-react';
import { gameAPI } from '../services/api';

const CreateGame = () => {
  const navigate = useNavigate();
  const [gameData, setGameData] = useState({
    sport: 'football',
    playersPerTeam: 5,
    location: '',
    time: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Creating game with data:', gameData);
      const response = await gameAPI.create(gameData);
      console.log('Game created successfully:', response.data);
      navigate(`/game/${response.data._id}/manage`);
    } catch (err: any) {
      console.error('Error creating game:', err);
      setError(err.response?.data?.error || err.message || 'Failed to create game');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Create New Game</h1>
      
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Sport</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={gameData.sport}
              onChange={(e) => setGameData({ ...gameData, sport: e.target.value })}
            >
              <option value="football">Football</option>
              <option value="other" disabled>More sports coming soon</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Players per Team
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="3"
                max="11"
                value={gameData.playersPerTeam}
                onChange={(e) => setGameData({ ...gameData, playersPerTeam: parseInt(e.target.value) })}
                className="w-full"
              />
              <span className="text-gray-700 font-medium">{gameData.playersPerTeam}v{gameData.playersPerTeam}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter location"
                value={gameData.location}
                onChange={(e) => setGameData({ ...gameData, location: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <div className="relative">
              <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="datetime-local"
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                value={gameData.time}
                onChange={(e) => setGameData({ ...gameData, time: e.target.value })}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating...' : 'Create Game'}
        </button>
      </form>
    </div>
  );
};

export default CreateGame;