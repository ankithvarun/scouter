import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Percent as Soccer, Menu } from 'lucide-react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import CreateGame from './pages/CreateGame';
import GameManager from './pages/GameManager';
import GameJoin from './pages/GameJoin';
import GameView from './pages/GameView';
import GameList from './pages/GameList';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/games" element={<GameList />} />
            <Route path="/create" element={<CreateGame />} />
            <Route path="/game/:id/manage" element={<GameManager />} />
            <Route path="/game/:id/join" element={<GameJoin />} />
            <Route path="/game/:id" element={<GameView />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;