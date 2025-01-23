// Simple browser-compatible event emitter
class EventEmitter {
    private listeners: { [key: string]: Function[] } = {};
  
    on(event: string, callback: Function) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
      this.listeners[event].push(callback);
      
      // Return unsubscribe function
      return () => {
        this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
      };
    }
  
    emit(event: string, data: any) {
      if (this.listeners[event]) {
        this.listeners[event].forEach(callback => callback(data));
      }
    }
  }
  
  const emergencyEmitter = new EventEmitter();
  
  // Emergency keywords to detect
  const EMERGENCY_KEYWORDS = [
    'emergency',
    'help',
    'urgent',
    'critical',
    'ambulance',
    'heart attack',
    'stroke',
    'bleeding',
    'unconscious',
    'not breathing',
    'severe pain',
    'chest pain',
  ];
  
  export const detectEmergency = (text: string): boolean => {
    const lowercaseText = text.toLowerCase();
    return EMERGENCY_KEYWORDS.some(keyword => lowercaseText.includes(keyword));
  };
  
  export const notifyStaff = (emergency: {
    id: number;
    patientId: string;
    message: string;
    timestamp: string;
    status: string;
  }) => {
    // Emit the emergency event for the staff dashboard to pick up
    emergencyEmitter.emit('emergency', emergency);
    
    // In a real application, this would also:
    // 1. Send to a backend server
    // 2. Trigger real-time notifications (e.g., WebSocket)
    // 3. Possibly trigger other emergency protocols
    console.log('Emergency notification sent:', emergency);
  };
  
  export const subscribeToEmergencies = (callback: (emergency: any) => void) => {
    return emergencyEmitter.on('emergency', callback);
  };