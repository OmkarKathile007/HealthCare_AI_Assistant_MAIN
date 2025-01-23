import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import AIAssistant from './components/AIAssistant';
import StaffDashboard from './components/StaffDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import DrDashBoard from './components/DrDashBoard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai-assistant"
          element={
            <ProtectedRoute>
              <AIAssistant />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff-dashboard"
          element={
            <ProtectedRoute>
              <StaffDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor"
          element={
            <ProtectedRoute>
              <DrDashBoard/>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;