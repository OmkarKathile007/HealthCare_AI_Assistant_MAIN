import React from 'react';
import { Stethoscope, Calendar, Clock, Phone, Mail } from 'lucide-react';

function DrDashBoard() {
  React.useEffect(() => {
    // Watson Assistant Integration
    window.watsonAssistantChatOptions = {
      integrationID: "f98e9145-9b4e-44ba-99fd-309a35ea24e3",
      region: "au-syd",
      serviceInstanceID: "846b8fd4-f128-4c7b-8150-212dd736a48a",
      onLoad: async (instance) => { await instance.render(); }
    };
    
    const script = document.createElement('script');
    script.src = `https://web-chat.global.assistant.watson.appdomain.cloud/versions/latest/WatsonAssistantChatEntry.js`;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">HealthConnect</h1>
            </div>
            <nav className="flex space-x-8">
              <a href="#services" className="text-gray-700 hover:text-blue-600">Services</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600">About</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                24/7 Medical Assistance
              </h2>
              <p className="text-gray-600 mb-6">
                Get instant medical advice from our AI-powered assistant or schedule a consultation with our healthcare professionals.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                  <span className="text-gray-700">Easy Scheduling</span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600" />
                  <span className="text-gray-700">24/7 Support</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">+91-9999999999</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">contact@healthconnect.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="Medical Professional"
              className="rounded-2xl shadow-lg object-cover w-full h-[600px]"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8 rounded-b-2xl">
              <p className="text-white text-lg font-medium">
                "Your health is our priority. Get started with our AI assistant today."
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            © 2024 HealthConnect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default DrDashBoard;