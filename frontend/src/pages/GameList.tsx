import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ChevronRight } from 'lucide-react';
import { gameAPI } from '../services/api';
import { Game } from '../types';

const GameList = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await gameAPI.getAll();
        setGames(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch games');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900">Upcoming Games</h1>
        <div className="text-center py-8">Loading games...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900">Upcoming Games</h1>
        <div className="bg-red-50 text-red-500 p-4 rounded-md">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">Upcoming Games</h1>
      
      {games.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No games scheduled. Create a new game to get started!
        </div>
      ) : (
        <div className="grid gap-4">
          {games.map((game) => (
            <Link
              key={game._id}
              to={`/game/${game._id}`}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span className="font-medium">{game.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <span>{new Date(game.time).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-gray-400" />
                    <span>{game.playersPerTeam}v{game.playersPerTeam}</span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default GameList;