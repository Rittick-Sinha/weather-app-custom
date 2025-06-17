
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
      {/* Animated particles for different weather conditions */}
      {weatherCode === 'rainy' && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-8 bg-blue-200 opacity-60 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${0.5 + Math.random()}s`
              }}
            />
          ))}
        </div>
      )}
      
      {weatherCode === 'snowy' && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-80 animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}
      
      {(weatherCode === 'sunny' && !isNight) && (
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-20 h-20 bg-yellow-300 rounded-full opacity-30 animate-pulse" />
          <div className="absolute top-24 right-24 w-12 h-12 bg-yellow-200 rounded-full opacity-50 animate-ping" />
        </div>
      )}
    </div>
  );
};

export default WeatherBackground;
