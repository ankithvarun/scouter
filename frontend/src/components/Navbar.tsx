import React from 'react';
import { Link } from 'react-router-dom';
import { Percent as Soccer, Menu, User, Calendar } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Soccer className="w-8 h-8" />
            <span className="font-bold text-xl">Scouter</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/games" className="hover:text-blue-200 flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span className="hidden sm:inline">Games</span>
            </Link>
            <Link to="/create" className="hover:text-blue-200">
              Create Game
            </Link>
            <Link to="/profile" className="hover:text-blue-200">
              <User className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;