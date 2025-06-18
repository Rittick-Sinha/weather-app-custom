
import React from 'react';

interface WeatherBackgroundProps {
  weatherCode?: string;
  isNight?: boolean;
}

const WeatherBackground: React.FC<WeatherBackgroundProps> = ({ weatherCode, isNight = false }) => {
  const getBackgroundClass = () => {
    if (isNight) {
      switch (weatherCode) {
        case 'sunny':
          return 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900';
        case 'cloudy':
          return 'bg-gradient-to-br from-gray-800 via-gray-900 to-black';
        case 'rainy':
          return 'bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900';
        case 'snowy':
          return 'bg-gradient-to-br from-slate-700 via-slate-800 to-blue-800';
        default:
          return 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900';
      }
    } else {
      switch (weatherCode) {
        case 'sunny':
          return 'bg-gradient-to-br from-orange-400 via-pink-500 to-red-500';
        case 'cloudy':
          return 'bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600';
        case 'rainy':
          return 'bg-gradient-to-br from-slate-500 via-slate-600 to-blue-700';
        case 'snowy':
          return 'bg-gradient-to-br from-slate-300 via-slate-400 to-blue-400';
        default:
          return 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600';
      }
    }
  };

  return (
    <div className={`absolute inset-0 transition-all duration-1000 ${getBackgroundClass()}`}>
      {/* Rain Animation */}
      {weatherCode === 'rainy' && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 bg-blue-200 opacity-60 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                height: `${20 + Math.random() * 30}px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${0.3 + Math.random() * 0.5}s`,
                transform: `translateY(-${Math.random() * 100}vh)`,
                animation: `rainDrop ${0.5 + Math.random() * 0.5}s linear infinite`
              }}
            />
          ))}
        </div>
      )}
      
      {/* Snow Animation */}
      {weatherCode === 'snowy' && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full opacity-80"
              style={{
                left: `${Math.random() * 100}%`,
                width: `${4 + Math.random() * 8}px`,
                height: `${4 + Math.random() * 8}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 3}s`,
                animation: `snowFall ${3 + Math.random() * 3}s linear infinite`
              }}
            />
          ))}
        </div>
      )}
      
      {/* Sunny Animation */}
      {(weatherCode === 'sunny' && !isNight) && (
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-20 h-20 bg-yellow-300 rounded-full opacity-30 animate-pulse" 
               style={{ animation: 'sunGlow 3s ease-in-out infinite' }} />
          <div className="absolute top-24 right-24 w-12 h-12 bg-yellow-200 rounded-full opacity-50" 
               style={{ animation: 'sunRays 4s linear infinite' }} />
          {/* Sun rays */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute top-28 right-28 w-1 h-8 bg-yellow-300 opacity-40"
              style={{
                transformOrigin: '50% 0%',
                transform: `rotate(${i * 45}deg)`,
                animation: `sunRayRotate 8s linear infinite`
              }}
            />
          ))}
        </div>
      )}

      {/* Night Moon Animation */}
      {isNight && weatherCode === 'sunny' && (
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-16 h-16 bg-yellow-100 rounded-full opacity-60"
               style={{ animation: 'moonGlow 4s ease-in-out infinite' }} />
          {/* Stars */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
                animation: `starTwinkle ${2 + Math.random() * 3}s ease-in-out infinite`
              }}
            />
          ))}
        </div>
      )}

      {/* Cloudy Animation */}
      {weatherCode === 'cloudy' && (
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/20 rounded-full"
              style={{
                width: `${100 + Math.random() * 100}px`,
                height: `${40 + Math.random() * 40}px`,
                left: `${10 + i * 30}%`,
                top: `${10 + i * 15}%`,
                animation: `cloudFloat ${10 + i * 5}s ease-in-out infinite`
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes rainDrop {
          0% { transform: translateY(-100vh) rotate(10deg); }
          100% { transform: translateY(100vh) rotate(10deg); }
        }
        
        @keyframes snowFall {
          0% { transform: translateY(-100vh) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(360deg); }
        }
        
        @keyframes sunGlow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        
        @keyframes sunRays {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes sunRayRotate {
          0% { opacity: 0.4; }
          50% { opacity: 0.8; }
          100% { opacity: 0.4; }
        }
        
        @keyframes moonGlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes cloudFloat {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(20px); }
        }
      `}</style>
    </div>
  );
};

export default WeatherBackground;
