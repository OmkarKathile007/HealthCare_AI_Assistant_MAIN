import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Activity } from 'lucide-react';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center">
      <div className="relative">
        <Heart className="w-24 h-24 text-red-500 animate-pulse" />
        <Activity className="w-16 h-16 text-cyan-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <h1 className="mt-8 text-4xl font-bold text-white">HealthCare AI</h1>
      <p className="mt-4 text-gray-400">Your Personal Health Assistant</p>
      <div className="mt-8 flex space-x-2">
        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};

export default SplashScreen;