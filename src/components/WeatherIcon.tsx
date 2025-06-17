
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
    className: "animate-pulse duration-2000"
  };

  const getIcon = () => {
    switch (weatherCode) {
      case 'sunny':
        return isNight ? <Moon {...iconProps} className="text-yellow-200 animate-pulse" /> : <Sun {...iconProps} className="text-yellow-400 animate-pulse" />;
      case 'cloudy':
        return isNight ? <CloudMoon {...iconProps} className="text-gray-300" /> : <Cloud {...iconProps} className="text-gray-400" />;
      case 'rainy':
        return <CloudRain {...iconProps} className="text-blue-400 animate-bounce" />;
      case 'snowy':
        return <CloudSnow {...iconProps} className="text-blue-200 animate-bounce" />;
      case 'drizzle':
        return <CloudDrizzle {...iconProps} className="text-blue-300" />;
      case 'windy':
        return <Wind {...iconProps} className="text-gray-400 animate-pulse" />;
      default:
        return <Sun {...iconProps} className="text-yellow-400" />;
    }
  };

  return (
    <div className="inline-block transform hover:scale-110 transition-transform duration-300">
      {getIcon()}
    </div>
  );
};

export default WeatherIcon;
