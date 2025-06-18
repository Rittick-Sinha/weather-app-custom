
import React, { useState } from 'react';
import { Search, MapPin, Droplets, Wind, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import WeatherIcon from './WeatherIcon';
import WeatherBackground from './WeatherBackground';
import TemperatureTrendChart from './TemperatureTrendChart';
import GoogleMap from './GoogleMap';

interface WeatherData {
  name: string;
  country: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  weatherCode: string;
  timezone: number;
  lat: number;
  lng: number;
}

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);
  const { toast } = useToast();

  // Mock weather data with coordinates for demonstration
  const mockWeatherData: { [key: string]: WeatherData } = {
    london: {
      name: 'London',
      country: 'UK',
      temperature: 15,
      description: 'Partly Cloudy',
      humidity: 65,
      windSpeed: 12,
      pressure: 1013,
      weatherCode: 'cloudy',
      timezone: 0,
      lat: 51.5074,
      lng: -0.1278
    },
    paris: {
      name: 'Paris',
      country: 'France',
      temperature: 18,
      description: 'Sunny',
      humidity: 45,
      windSpeed: 8,
      pressure: 1020,
      weatherCode: 'sunny',
      timezone: 1,
      lat: 48.8566,
      lng: 2.3522
    },
    tokyo: {
      name: 'Tokyo',
      country: 'Japan',
      temperature: 22,
      description: 'Light Rain',
      humidity: 80,
      windSpeed: 15,
      pressure: 1008,
      weatherCode: 'rainy',
      timezone: 9,
      lat: 35.6762,
      lng: 139.6503
    },
    newyork: {
      name: 'New York',
      country: 'USA',
      temperature: 12,
      description: 'Snow',
      humidity: 90,
      windSpeed: 20,
      pressure: 995,
      weatherCode: 'snowy',
      timezone: -5,
      lat: 40.7128,
      lng: -74.0060
    },
    dubai: {
      name: 'Dubai',
      country: 'UAE',
      temperature: 35,
      description: 'Hot and Sunny',
      humidity: 30,
      windSpeed: 5,
      pressure: 1015,
      weatherCode: 'sunny',
      timezone: 4,
      lat: 25.2048,
      lng: 55.2708
    }
  };

  const searchWeather = async () => {
    if (!city.trim()) {
      toast({
        title: "Error",
        description: "Please enter a city name",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const normalizedCity = city.toLowerCase().replace(/\s+/g, '');
      const weatherData = mockWeatherData[normalizedCity];
      
      if (weatherData) {
        setWeather(weatherData);
      } else {
        toast({
          title: "City not found",
          description: "Please try searching for London, Paris, Tokyo, New York, or Dubai",
          variant: "destructive"
        });
      }
      setLoading(false);
    }, 1000);
  };

  const convertTemperature = (temp: number) => {
    return isCelsius ? temp : Math.round((temp * 9/5) + 32);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchWeather();
    }
  };

  const currentTime = weather ? new Date().getHours() + (weather.timezone || 0) : new Date().getHours();
  const isNight = currentTime < 6 || currentTime > 18;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <WeatherBackground weatherCode={weather?.weatherCode} isNight={isNight} />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-6xl space-y-6">
          {/* Search Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              Weather App
            </h1>
            <p className="text-white/80 text-lg">
              Search for weather in any city
            </p>
          </div>

          <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
            <CardContent className="p-6 space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter city name..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30"
                  disabled={loading}
                />
                <Button 
                  onClick={searchWeather}
                  disabled={loading}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {/* Temperature Toggle */}
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsCelsius(!isCelsius)}
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  {isCelsius ? '°C' : '°F'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Weather Display */}
          {weather && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Current Weather Card */}
              <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl animate-fade-in">
                <CardContent className="p-6 space-y-6">
                  {/* Location */}
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 text-white">
                      <MapPin className="h-5 w-5" />
                      <span className="text-xl font-semibold">
                        {weather.name}, {weather.country}
                      </span>
                    </div>
                  </div>

                  {/* Temperature and Icon */}
                  <div className="text-center space-y-4">
                    <WeatherIcon weatherCode={weather.weatherCode} size={80} />
                    <div className="space-y-2">
                      <div className="text-5xl font-bold text-white animate-scale-in">
                        {convertTemperature(weather.temperature)}°{isCelsius ? 'C' : 'F'}
                      </div>
                      <div className="text-white/80 text-lg capitalize">
                        {weather.description}
                      </div>
                    </div>
                  </div>

                  {/* Weather Details */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center space-y-2">
                      <Droplets className="h-6 w-6 text-blue-300 mx-auto" />
                      <div className="text-white/60 text-sm">Humidity</div>
                      <div className="text-white font-semibold">{weather.humidity}%</div>
                    </div>
                    <div className="text-center space-y-2">
                      <Wind className="h-6 w-6 text-gray-300 mx-auto" />
                      <div className="text-white/60 text-sm">Wind</div>
                      <div className="text-white font-semibold">{weather.windSpeed} km/h</div>
                    </div>
                    <div className="text-center space-y-2">
                      <Gauge className="h-6 w-6 text-yellow-300 mx-auto" />
                      <div className="text-white/60 text-sm">Pressure</div>
                      <div className="text-white font-semibold">{weather.pressure} hPa</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Temperature Trend Chart */}
              <TemperatureTrendChart cityName={weather.name} isCelsius={isCelsius} />

              {/* Google Map */}
              <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl animate-fade-in">
                <CardContent className="p-6">
                  <h3 className="text-white text-lg font-semibold mb-4 text-center">Location</h3>
                  <GoogleMap 
                    lat={weather.lat} 
                    lng={weather.lng} 
                    zoom={10}
                    className="w-full h-64"
                  />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Demo Cities */}
          <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
            <CardContent className="p-4">
              <p className="text-white/80 text-sm text-center mb-3">Try these cities:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['London', 'Paris', 'Tokyo', 'New York', 'Dubai'].map((demoCity) => (
                  <Button
                    key={demoCity}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setCity(demoCity);
                      setTimeout(() => searchWeather(), 100);
                    }}
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-xs"
                  >
                    {demoCity}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
