import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, Users } from 'lucide-react';
import { gameAPI } from '../services/api';
import { Game } from '../types';

interface Position {
  id: string;
  name: string;
  taken: boolean;
}

const GameJoin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await gameAPI.getById(id!);
        setGame(response.data);
        // Initialize positions based on game data
        const initialPositions: Position[] = [
          { id: 'gk', name: 'Goalkeeper', taken: false },
          { id: 'lb', name: 'Left Back', taken: false },
          { id: 'cb1', name: 'Center Back', taken: false },
          { id: 'cb2', name: 'Center Back', taken: false },
          { id: 'rb', name: 'Right Back', taken: false },
          { id: 'cm1', name: 'Center Midfielder', taken: false },
          { id: 'cm2', name: 'Center Midfielder', taken: false },
          { id: 'lw', name: 'Left Wing', taken: false },
          { id: 'rw', name: 'Right Wing', taken: false },
          { id: 'st', name: 'Striker', taken: false },
        ].slice(0, response.data.playersPerTeam || 5);
        setPositions(initialPositions);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch game details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchGame();
    }
  }, [id]);

  const handleJoinGame = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName || !selectedPosition) return;

    try {
      await gameAPI.join(id!, {
        playerName,
        position: selectedPosition,
      });
      navigate(`/game/${id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to join game');
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900">Join Game</h1>
        <div className="text-center py-8">Loading game details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900">Join Game</h1>
        <div className="bg-red-50 text-red-500 p-4 rounded-md">{error}</div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900">Join Game</h1>
        <div className="text-center py-8">Game not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">Join Game</h1>
      
      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Game Details</h2>
            <p className="text-gray-600">{game.location}</p>
            <p className="text-gray-600">{new Date(game.time).toLocaleString()}</p>
            <p className="text-gray-600">{game.playersPerTeam}v{game.playersPerTeam}</p>
          </div>

          <form onSubmit={handleJoinGame} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Your Name</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Select Position</label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {positions.map((position) => (
                  <button
                    key={position.id}
                    type="button"
                    onClick={() => setSelectedPosition(position.id)}
                    className={`p-2 rounded-md border ${
                      selectedPosition === position.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-blue-500'
                    } ${position.taken ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={position.taken}
                  >
                    {position.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={!playerName || !selectedPosition}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Join Game
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GameJoin;