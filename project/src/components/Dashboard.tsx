import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Activity, Users, Bell, LogOut,Stethoscope } from 'lucide-react';


const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-cyan-500" />
              <span className="ml-2 text-xl font-bold text-white">HealthCare AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
              <LogOut
                className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer"
                onClick={() => navigate('/login')}
              />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div
              onClick={() => navigate('/ai-assistant')}
              className="bg-gray-800 overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <Mic className="h-8 w-8 text-cyan-500" />
                  <h3 className="ml-3 text-lg font-medium text-white">AI Assistant for patient</h3>
                </div>
                <p className="mt-4 text-sm text-gray-400">
                  Access your personal AI healthcare assistant with voice recognition
                </p>
              </div>
            </div>

            <div
              onClick={() => navigate('/staff-dashboard')}
              className="bg-gray-800 overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-purple-500" />
                 
                  <h3 className="ml-3 text-lg font-medium text-white">Healthcare Staff</h3>
                </div>
                <p className="mt-4 text-sm text-gray-400">
                  connect with healthcare staff incase of emergencies
                </p>
              </div>
            </div>
            <div
              onClick={() => navigate('/doctor')}
              className="bg-gray-800 overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="p-6">
                <div className="flex items-center">
                  
                  <Stethoscope className="h-8 w-8 text-red-500" />
                  <h3 className="ml-3 text-lg font-medium text-white">Doctor DashBoard</h3>
                </div>
                <p className="mt-4 text-sm text-gray-400">
                    Access patient  Details
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;