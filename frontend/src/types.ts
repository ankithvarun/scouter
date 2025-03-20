export interface Game {
  _id: string;
  sport: 'football';
  playersPerTeam: number;
  location: string;
  time: string;
  creatorId: string;
  status: 'open' | 'in-progress' | 'completed';
}

export interface Player {
  id: string;
  name: string;
  position?: string;
  isRegistered: boolean;
  gameStats?: {
    goals: number;
    assists: number;
    yellowCards: number;
    redCards: number;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  favoritePosition?: string;
  favoriteFoot?: 'left' | 'right' | 'both';
  gender?: string;
  level?: 'newbie' | 'amateur' | 'professional' | 'world-class';
  favoriteGames: string[];
}