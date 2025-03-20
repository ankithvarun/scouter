import React from 'react';
import { Link } from 'react-router-dom';
import { Percent as Soccer, Users, Share2, Trophy } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <Soccer className="w-16 h-16 mx-auto text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Welcome to GameDay</h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Organize football matches, manage teams, and track game statistics - just like in your favorite video games!
        </p>
        <Link
          to="/create"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Create a Game
        </Link>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <FeatureCard
          icon={<Users className="w-8 h-8 text-blue-600" />}
          title="Create Teams"
          description="Set up matches from 3v3 to 11v11 with customizable team sizes"
        />
        <FeatureCard
          icon={<Share2 className="w-8 h-8 text-blue-600" />}
          title="Easy Sharing"
          description="Share game links with players to let them join and pick positions"
        />
        <FeatureCard
          icon={<Trophy className="w-8 h-8 text-blue-600" />}
          title="Track Stats"
          description="Record goals, assists, cards, and more during the game"
        />
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <div className="flex flex-col items-center text-center">
      {icon}
      <h3 className="mt-4 text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  </div>
);

export default LandingPage;