import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import Spline from '@splinetool/react-spline';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm EcoBot, your AI waste management assistant. I can help you with waste classification, recycling tips, and answer questions about EcoSmart!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
      return "Hello! I'm here to help you with waste management and EcoSmart features. What would you like to know?";
    }
    
    if (msg.includes('biodegradable') || msg.includes('organic')) {
      return "Biodegradable waste includes food scraps, paper, leaves, and organic materials that decompose naturally. Our AI can classify these with 95% accuracy!";
    }
    
    if (msg.includes('plastic') || msg.includes('non-biodegradable')) {
      return "Non-biodegradable waste like plastic, metal, and glass should be recycled properly. Upload an image to our classifier to get specific disposal recommendations!";
    }
    
    if (msg.includes('how') && msg.includes('work')) {
      return "EcoSmart uses a CNN model trained on 10,000+ images to classify waste. Simply upload a photo, and I'll tell you if it's biodegradable or not, plus give disposal tips!";
    }
    
    if (msg.includes('accuracy') || msg.includes('reliable')) {
      return "Our AI model achieves 95%+ accuracy in waste classification. It's trained on diverse datasets and continuously improved for better results.";
    }
    
    if (msg.includes('recycle') || msg.includes('disposal')) {
      return "For recycling tips: separate materials, clean containers, check local guidelines. Use our classification tool to get specific recommendations for each item!";
    }
    
    if (msg.includes('feature') || msg.includes('what can')) {
      return "EcoSmart features: 🤖 AI Classification, 📸 Image Upload, 💡 Smart Tips, 🌱 Eco-friendly UI, 📱 Responsive Design, and 🔐 User Profiles with Firebase!";
    }
    
    if (msg.includes('help') || msg.includes('support')) {
      return "I can help with: waste classification, recycling tips, app features, disposal methods, and environmental impact. What specific topic interests you?";
    }
    
    return "That's a great question! I'm here to help with waste management, recycling, and EcoSmart features. Could you be more specific about what you'd like to know?";
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Bot response after delay
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: getBotResponse(inputText),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-green-200 dark:border-green-700 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20 rounded-t-lg">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">EcoBot</h3>
                <p className="text-xs text-green-600 dark:text-green-400">AI Waste Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.isBot
                      ? 'bg-green-100 dark:bg-green-900/30 text-gray-800 dark:text-green-100'
                      : 'bg-green-500 text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-green-200 dark:border-green-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about waste management..."
                className="flex-1 px-3 py-2 border border-green-200 dark:border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bot Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-48 h-48 transition-all duration-300 hover:scale-110 flex items-center justify-center"
      >
        {/* Spline Robot */}
        <div className="w-full h-full">
          <Spline
            scene="https://prod.spline.design/rU2-Ks0SC0T5od9B/scene.splinecode"
            className="w-full h-full scale-200"
          />
        </div>
      </button>
    </div>
  );
};