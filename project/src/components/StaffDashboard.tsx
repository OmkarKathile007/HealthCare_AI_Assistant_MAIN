// import React, { useState, useEffect } from 'react';
// import { Bell, Users, AlertTriangle } from 'lucide-react';

// const StaffDashboard = () => {
//   const [emergencies, setEmergencies] = useState([
//     {
//       id: 1,
//       patientId: '12',
//       message: 'Emergency: Patient needs immediate assistance',
//       timestamp: new Date().toISOString(),
//       status: 'active'
//     }
//   ]);

//   useEffect(() => {
//     // Listen for new emergency messages
//     const handleEmergency = (emergency) => {
//       setEmergencies((prev) => [...prev, emergency]);
//     };

//     // Cleanup
//     return () => {
//       // Remove emergency listener
//     };
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-900">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center">
//             <Users className="h-8 w-8 text-purple-500" />
//             <h1 className="ml-3 text-2xl font-bold text-white">Healthcare Staff Dashboard</h1>
//           </div>
//           <div className="relative">
//             <Bell className="h-6 w-6 text-gray-400" />
//             {emergencies.length > 0 && (
//               <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
//                 {emergencies.length}
//               </span>
//             )}
//           </div>
//         </div>

//         <div className="bg-gray-800 rounded-lg shadow-lg p-6">
//           <h2 className="text-xl font-semibold text-white mb-4">Emergency Alerts</h2>
//           <div className="space-y-4">
//             {emergencies.map((emergency) => (
//               <div
//                 key={emergency.id}
//                 className="bg-gray-700 rounded-lg p-4 flex items-start space-x-4"
//               >
//                 <div className="flex-shrink-0">
//                   <AlertTriangle className="h-6 w-6 text-red-500" />
//                 </div>
//                 <div className="flex-1">
//                   <div className="flex items-center justify-between">
//                     <h3 className="text-lg font-medium text-white">
//                       Patient {emergency.patientId}
//                     </h3>
//                     <span className="text-sm text-gray-400">
//                       {new Date(emergency.timestamp).toLocaleTimeString()}
//                     </span>
//                   </div>
//                   <p className="mt-1 text-gray-300">{emergency.message}</p>
//                   <div className="mt-2">
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-200 text-red-800">
//                       {emergency.status}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StaffDashboard;

import React, { useState, useEffect } from 'react';
import { Bell, Users, AlertTriangle } from 'lucide-react';
import { subscribeToEmergencies } from './emergencyService';

const StaffDashboard = () => {
  const [emergencies, setEmergencies] = useState([]);
  const [hasNewEmergency, setHasNewEmergency] = useState(false);

  useEffect(() => {
    // Subscribe to emergency notifications
    const unsubscribe = subscribeToEmergencies((emergency) => {
      setEmergencies((prev) => [...prev, emergency]);
      setHasNewEmergency(true);
      
      // Play alert sound
      const audio = new Audio('/emergency-alert.mp3');
      audio.play().catch(error => console.log('Audio playback failed:', error));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleEmergencyAcknowledge = (emergencyId) => {
    setEmergencies(prev =>
      prev.map(emergency =>
        emergency.id === emergencyId
          ? { ...emergency, status: 'acknowledged' }
          : emergency
      )
    );
    setHasNewEmergency(false);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-500" />
            <h1 className="ml-3 text-2xl font-bold text-white">Healthcare Staff Dashboard</h1>
          </div>
          <div className="relative">
            <Bell className={`h-6 w-6 ${hasNewEmergency ? 'text-red-500 animate-bounce' : 'text-gray-400'}`} />
            {emergencies.length > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                {emergencies.length}
              </span>
            )}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Emergency Alerts</h2>
          <div className="space-y-4">
            {emergencies.map((emergency) => (
              <div
                key={emergency.id}
                className={`bg-gray-700 rounded-lg p-4 flex items-start space-x-4 ${
                  emergency.status === 'active' ? 'border-l-4 border-red-500' : ''
                }`}
              >
                <div className="flex-shrink-0">
                  <AlertTriangle className={`h-6 w-6 ${
                    emergency.status === 'active' ? 'text-red-500' : 'text-yellow-500'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">
                      Patient {emergency.patientId}
                    </h3>
                    <span className="text-sm text-gray-400">
                      {new Date(emergency.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-300">{emergency.message}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      emergency.status === 'active'
                        ? 'bg-red-200 text-red-800'
                        : 'bg-yellow-200 text-yellow-800'
                    }`}>
                      {emergency.status}
                    </span>
                    {emergency.status === 'active' && (
                      <button
                        onClick={() => handleEmergencyAcknowledge(emergency.id)}
                        className="px-3 py-1 text-sm bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
                      >
                        Acknowledge
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {emergencies.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                No emergency alerts at this time
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;