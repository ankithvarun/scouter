import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Users, Trophy, Star, Award, Share2 } from 'lucide-react';
import { DndContext, DragEndEvent, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface Player {
  id: string;
  name: string;
  position: string;
  team: 'A' | 'B';
  stats: {
    goals: number;
    assists: number;
    yellowCards: number;
    redCards: number;
  };
}

interface Position {
  id: string;
  name: string;
  x: number;
  y: number;
  team: 'A' | 'B';
  player?: Player;
  locked?: boolean;
}

interface TeamStats {
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
}

const DraggablePlayer = ({ position }: { position: Position }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: position.id,
    disabled: position.locked,
  });

  const style = transform ? {
    transform: CSS.Transform.toString(transform),
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`absolute w-14 h-14 transform -translate-x-1/2 -translate-y-1/2 cursor-move
        ${position.locked ? 'cursor-not-allowed' : 'cursor-move'}`}
      style={{
        ...style,
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
    >
      <div className={`relative flex flex-col items-center ${position.locked ? 'opacity-75' : ''}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center
          ${position.player ? 'bg-blue-500 text-white' : 'bg-white bg-opacity-50'}`}>
          {position.player ? (
            <span className="text-xs font-bold">{position.player.name.charAt(0)}</span>
          ) : (
            <Users className="w-4 h-4" />
          )}
        </div>
        {position.player && (
          <span className="absolute -top-6 whitespace-nowrap text-xs font-medium bg-white px-2 py-0.5 rounded shadow-sm">
            {position.player.name}
          </span>
        )}
      </div>
    </div>
  );
};

const GameView = () => {
  const { id } = useParams();
  const [positions, setPositions] = useState<Position[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [showPlayerForm, setShowPlayerForm] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [gameDetails, setGameDetails] = useState({
    location: 'Central Park Field',
    time: '5:00 PM',
    date: 'March 20, 2025',
  });

  const teamStats: Record<'A' | 'B', TeamStats> = {
    A: { goals: 2, assists: 1, yellowCards: 1, redCards: 0 },
    B: { goals: 1, assists: 1, yellowCards: 0, redCards: 0 },
  };

  useEffect(() => {
    // Initialize positions with goalkeepers and goal posts
    const initialPositions: Position[] = [
      // Goal posts Team A
      { id: 'a-goal-left', name: 'Goal Post', x: 5, y: 40, team: 'A', locked: true },
      { id: 'a-goal-right', name: 'Goal Post', x: 5, y: 60, team: 'A', locked: true },
      { id: 'a-gk', name: 'Goalkeeper', x: 10, y: 50, team: 'A' },
      // ... rest of the positions
    ];
    setPositions(initialPositions);
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over) return;

    setPositions(positions.map(pos => {
      if (pos.id === active.id) {
        return {
          ...pos,
          x: over.rect.left,
          y: over.rect.top,
        };
      }
      return pos;
    }));
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/game/${id}/join`;
    const shareText = `Hi! Join this game today at ${gameDetails.time} in ${gameDetails.location}`;
    
    navigator.clipboard.writeText(shareUrl);
    setShowShareModal(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 py-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Trophy className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Match View</h1>
        </div>
        <button
          onClick={handleShare}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Share2 className="w-4 h-4" />
          <span>Share Game</span>
        </button>
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="relative bg-green-600 aspect-[2/3] rounded-lg overflow-hidden">
          {/* Field Markings */}
          <div className="absolute inset-0 border-2 border-white opacity-50" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white opacity-50" />
          <div className="absolute left-0 right-0 top-1/2 h-px bg-white opacity-50" />
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-white rounded-full opacity-50" />

          {/* Goal Posts */}
          <div className="absolute left-0 top-1/3 bottom-1/3 w-2 bg-white" />
          <div className="absolute right-0 top-1/3 bottom-1/3 w-2 bg-white" />

          {/* Player Positions */}
          {positions.map((position) => (
            <DraggablePlayer key={position.id} position={position} />
          ))}
        </div>
      </DndContext>

      {/* Team Statistics */}
      <div className="grid md:grid-cols-2 gap-6">
        {(['A', 'B'] as const).map((team) => (
          <div key={team} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Team {team} Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{teamStats[team].goals}</div>
                <div className="text-sm text-gray-600">Goals</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{teamStats[team].assists}</div>
                <div className="text-sm text-gray-600">Assists</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-yellow-500">{teamStats[team].yellowCards}</div>
                <div className="text-sm text-gray-600">Yellow Cards</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-red-600">{teamStats[team].redCards}</div>
                <div className="text-sm text-gray-600">Red Cards</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Share Game</h3>
            <p className="text-gray-600 mb-4">
              Hi! Join this game today at {gameDetails.time} in {gameDetails.location}
            </p>
            <p className="text-sm text-gray-500 mb-4">Link copied to clipboard!</p>
            <button
              onClick={() => setShowShareModal(false)}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameView;