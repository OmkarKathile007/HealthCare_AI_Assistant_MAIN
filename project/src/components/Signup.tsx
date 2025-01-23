import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, Mail, UserPlus } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add registration logic here
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-white">Create Account</h2>
          <p className="mt-2 text-sm text-gray-400">Join our healthcare community</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none relative block w-full px-12 py-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Full name"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-12 py-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Email address"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-12 py-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              Sign up
              <UserPlus className="ml-2 h-5 w-5" />
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-cyan-500 hover:text-cyan-400">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;