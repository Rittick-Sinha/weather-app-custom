
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Droplets, Wind } from 'lucide-react';
import WeatherIcon from './WeatherIcon';

interface HourlyForecast {
  time: string;
  temp_c: number;
  temp_f: number;
  condition: {
    text: string;
    code: number;
  };
  humidity: number;
  wind_kph: number;
  chance_of_rain: number;
  is_day: number;
}

interface CurrentForecastProps {
  isCelsius: boolean;
}

const CurrentForecast: React.FC<CurrentForecastProps> = ({ isCelsius }) => {
  // Mock hourly data based on the JSON structure provided
  const mockHourlyData: HourlyForecast[] = [
    {
      time: "2025-06-18 21:00",
      temp_c: 27.7,
      temp_f: 81.9,
      condition: { text: "Patchy rain nearby", code: 1063 },
      humidity: 79,
      wind_kph: 19.8,
      chance_of_rain: 100,
      is_day: 0
    },
    {
      time: "2025-06-18 22:00",
      temp_c: 27.4,
      temp_f: 81.4,
      condition: { text: "Patchy rain nearby", code: 1063 },
      humidity: 80,
      wind_kph: 19.4,
      chance_of_rain: 72,
      is_day: 0
    },
    {
      time: "2025-06-18 23:00",
      temp_c: 27.3,
      temp_f: 81.1,
      condition: { text: "Patchy rain nearby", code: 1063 },
      humidity: 81,
      wind_kph: 21.6,
      chance_of_rain: 100,
      is_day: 0
    },
    {
      time: "2025-06-19 00:00",
      temp_c: 26.8,
      temp_f: 80.2,
      condition: { text: "Light rain", code: 1183 },
      humidity: 85,
      wind_kph: 18.5,
      chance_of_rain: 95,
      is_day: 0
    },
    {
      time: "2025-06-19 01:00",
      temp_c: 26.5,
      temp_f: 79.7,
      condition: { text: "Cloudy", code: 1006 },
      humidity: 82,
      wind_kph: 16.2,
      chance_of_rain: 45,
      is_day: 0
    },
    {
      time: "2025-06-19 02:00",
      temp_c: 26.2,
      temp_f: 79.2,
      condition: { text: "Partly cloudy", code: 1003 },
      humidity: 78,
      wind_kph: 14.8,
      chance_of_rain: 20,
      is_day: 0
    }
  ];

  const getWeatherCode = (conditionCode: number) => {
    if (conditionCode === 1183 || conditionCode === 1063) return 'rainy';
    if (conditionCode === 1006) return 'cloudy';
    if (conditionCode === 1003) return 'cloudy';
    return 'sunny';
  };

  const formatTime = (timeString: string) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      hour12: true 
    });
  };

  return (
    <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl animate-fade-in">
      <CardContent className="p-6">
        <h3 className="text-white text-lg font-semibold mb-4 flex items-center">
          <Clock className="h-5 w-5 mr-2" />
          Hourly Forecast
        </h3>
        
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {mockHourlyData.map((hour, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <div className="flex items-center space-x-3">
                <span className="text-white/80 text-sm font-medium min-w-[60px]">
                  {formatTime(hour.time)}
                </span>
                <WeatherIcon 
                  weatherCode={getWeatherCode(hour.condition.code)} 
                  size={24} 
                  isNight={hour.is_day === 0}
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-white font-semibold">
                  {isCelsius ? Math.round(hour.temp_c) : Math.round(hour.temp_f)}°{isCelsius ? 'C' : 'F'}
                </span>
                
                <div className="flex items-center space-x-1 text-blue-300">
                  <Droplets className="h-3 w-3" />
                  <span className="text-xs">{hour.chance_of_rain}%</span>
                </div>
                
                <div className="flex items-center space-x-1 text-gray-300">
                  <Wind className="h-3 w-3" />
                  <span className="text-xs">{Math.round(hour.wind_kph)}km/h</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentForecast;
