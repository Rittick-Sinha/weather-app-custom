
import React from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, CloudDrizzle, Moon, CloudMoon, Wind } from 'lucide-react';

interface WeatherIconProps {
  weatherCode: string;
  size?: number;
  isNight?: boolean;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ weatherCode, size = 48, isNight = false }) => {
  const iconProps = {
    size,
  };

  const getIcon = () => {
    switch (weatherCode) {
      case 'sunny':
        return isNight ? (
          <Moon 
            {...iconProps} 
            className="text-yellow-200 animate-pulse" 
            style={{ animation: 'moonBob 3s ease-in-out infinite' }}
          />
        ) : (
          <Sun 
            {...iconProps} 
            className="text-yellow-400" 
            style={{ animation: 'sunSpin 4s linear infinite, sunPulse 2s ease-in-out infinite' }}
          />
        );
      case 'cloudy':
        return isNight ? (
          <CloudMoon 
            {...iconProps} 
            className="text-gray-300" 
            style={{ animation: 'cloudDrift 6s ease-in-out infinite' }}
          />
        ) : (
          <Cloud 
            {...iconProps} 
            className="text-gray-400" 
            style={{ animation: 'cloudDrift 6s ease-in-out infinite' }}
          />
        );
      case 'rainy':
        return (
          <CloudRain 
            {...iconProps} 
            className="text-blue-400" 
            style={{ animation: 'rainBounce 1s ease-in-out infinite' }}
          />
        );
      case 'snowy':
        return (
          <CloudSnow 
            {...iconProps} 
            className="text-blue-200" 
            style={{ animation: 'snowShake 2s ease-in-out infinite' }}
          />
        );
      case 'drizzle':
        return (
          <CloudDrizzle 
            {...iconProps} 
            className="text-blue-300" 
            style={{ animation: 'drizzleWiggle 1.5s ease-in-out infinite' }}
          />
        );
      case 'windy':
        return (
          <Wind 
            {...iconProps} 
            className="text-gray-400" 
            style={{ animation: 'windSway 2s ease-in-out infinite' }}
          />
        );
      default:
        return <Sun {...iconProps} className="text-yellow-400" />;
    }
  };

  return (
    <div className="inline-block transform hover:scale-110 transition-transform duration-300">
      {getIcon()}
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes sunSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes sunPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes moonBob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes cloudDrift {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(10px); }
        }
        
        @keyframes rainBounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes snowShake {
          0%, 100% { transform: translateX(0px) rotate(0deg); }
          25% { transform: translateX(-2px) rotate(-2deg); }
          75% { transform: translateX(2px) rotate(2deg); }
        }
        
        @keyframes drizzleWiggle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-2px) rotate(1deg); }
          66% { transform: translateY(2px) rotate(-1deg); }
        }
        
        @keyframes windSway {
          0%, 100% { transform: translateX(0px) rotate(0deg); }
          33% { transform: translateX(3px) rotate(2deg); }
          66% { transform: translateX(-3px) rotate(-2deg); }
        }
      `}</style>
    </div>
  );
};

export default WeatherIcon;
