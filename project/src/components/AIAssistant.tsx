


import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Brain, Wand2, Sparkles } from 'lucide-react';
import { detectEmergency, notifyStaff } from './emergencyService';
import AI_Image from '../assets/AI-Image.png'


declare global {
  interface Window {
    watsonAssistantChatOptions: {
      integrationID: string;
      region: string;
      serviceInstanceID: string;
      onLoad: (instance: any) => Promise<void>;
      clientVersion?: string;
    };
    watsonAssistant: any;
  }
}

function AIAssistantAnimation({ isListening, isSpeaking }) {
  return (
    <div className="relative w-64 h-64 mx-auto mb-8">
      <div className={`absolute inset-0 bg-gradient-to-b from-cyan-500 to-purple-600 rounded-full blur-xl opacity-20 animate-pulse ${isListening || isSpeaking ? 'scale-110' : 'scale-100'} transition-transform duration-500`}></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-screen h-full">
          <div className="w-full h-full rounded-full border-4 border-cyan-400 bg-gray-800 flex items-center justify-center">
            {/* <Brain className="w-24 h-24 text-cyan-400" /> */}
            <img src={AI_Image} alt="" />
          </div>
          <div className={`absolute inset-0 border-4 border-purple-500 rounded-full ${isListening ? 'animate-ping' : ''}`}></div>
          <div className={`absolute inset-0 border-4 border-cyan-400 rounded-full ${isSpeaking ? 'animate-pulse' : ''}`}></div>
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-xl opacity-20"></div>
        </div>
      </div>
      {(isListening || isSpeaking) && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-gradient-to-t from-cyan-400 to-purple-500 rounded-full animate-sound-wave"
              style={{
                height: `${Math.random() * 24 + 8}px`,
                animationDelay: `${i * 0.1}s`
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'system', text: "Hello! I'm HealthCare AI Assistant, your Advanced Virtual Assistant. How can I help you today?" }
  ]);
  const [recognition, setRecognition] = useState(null);
  const watsonAssistantRef = useRef(null);

  useEffect(() => {
    // Initialize Watson Assistant
    window.watsonAssistantChatOptions = {
      integrationID: "e5a77683-27a7-4704-8cdb-43043c6b82bc",
      region: "au-syd",
      serviceInstanceID: "9bcfc754-7d6b-48e4-95c6-bfb20ca9b167",
      onLoad: async (instance) => {
        watsonAssistantRef.current = instance;
        await instance.render();
      }
    };

    const script = document.createElement('script');
    script.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/latest/WatsonAssistantChatEntry.js";
    document.head.appendChild(script);

    // Initialize Speech Recognition
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const newRecognition = new SpeechRecognition();
        newRecognition.continuous = true;
        newRecognition.interimResults = false;
        newRecognition.lang = 'en-US';

        newRecognition.onresult = async (event) => {
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              const transcript = event.results[i][0].transcript.trim();
              setMessages((prev) => [...prev, { type: 'user', text: transcript }]);
              
              // Check for emergency keywords
              if (detectEmergency(transcript)) {
                const emergency = {
                  id: Date.now(),
                  patientId: 'Unknown', // In a real app, this would be the actual patient ID
                  message: `Emergency detected: ${transcript}`,
                  timestamp: new Date().toISOString(),
                  status: 'active'
                };
                
                // Notify staff dashboard
                notifyStaff(emergency);
                
                // Immediate response for emergency
                const emergencyResponse = "I've detected an emergency and notified the medical staff. Help is on the way. Please stay calm and don't move unless absolutely necessary.";
                setMessages((prev) => [...prev, { type: 'system', text: emergencyResponse }]);
                speak(emergencyResponse);
              }
              
              await sendMessageToWatson(transcript);
            }
          }
        };

        newRecognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };

        setRecognition(newRecognition);
      }
    }

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const sendMessageToWatson = async (message) => {
    if (!watsonAssistantRef.current) {
      console.error('Watson Assistant not initialized');
      return;
    }

    try {
      const response = await watsonAssistantRef.current.send({ input: { text: message }});
      const reply = response.output.generic[0]?.text || "";
      
      setMessages((prev) => [...prev, { type: 'system', text: reply }]);
      speak(reply);
    } catch (error) {
      console.error('Error sending message to Watson:', error);
      const errorMessage = "";
      setMessages((prev) => [...prev, { type: 'system', text: errorMessage }]);
      speak(errorMessage);
    }
  };

  const speak = (text) => {
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (recognition) {
      if (!isListening) {
        recognition.start();
      } else {
        recognition.stop();
      }
      setIsListening(!isListening);
    }
  };

  return (
    <div className="h-screen bg-gray-900 text-white">
      <div className="max-w-4xl m-auto px-4 py-8">
        <AIAssistantAnimation isListening={isListening} isSpeaking={isSpeaking} />

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            YOUR HEALTHCARE COMPANION
          </h1>
          <p className="text-gray-400 mt-2">
            {isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : 'Ready to help'}
          </p>
        </div>
        
        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
          <div className="h-44 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start space-x-3 ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.type === 'system' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`rounded-lg p-4 max-w-[80%] ${
                    message.type === 'system'
                      ? 'bg-gray-700'
                      : 'bg-gradient-to-r from-cyan-500 to-purple-600'
                  }`}
                >
                  <p>{message.text}</p>
                </div>
                {message.type === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                    <Wand2 className="w-4 h-4 text-purple-400" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="border-t border-gray-700 p-4 bg-gray-800">
            <div className="flex justify-center space-x-4">
              <button
                onClick={toggleListening}
                className={`p-4 rounded-full transition-all duration-300 ${
                  isListening
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse'
                    : 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500'
                }`}
              >
                {isListening ? (
                  <MicOff className="w-6 h-6 text-white" />
                ) : (
                  <Mic className="w-6 h-6 text-white" />
                )}
              </button>
              {isListening && (
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-purple-400 animate-spin" />
                  <span className="text-purple-400">Listening to you...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
