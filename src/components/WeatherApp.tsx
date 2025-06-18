
import React, { useState } from 'react';
import { Search, MapPin, Droplets, Wind, Gauge, Calendar, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import WeatherIcon from './WeatherIcon';
import WeatherBackground from './WeatherBackground';
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
  const [isTransitioning, setIsTransitioning] = useState(false);
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
    setIsTransitioning(true);
    
    // Simulate API call delay with smooth transition
    setTimeout(() => {
      const normalizedCity = city.toLowerCase().replace(/\s+/g, '');
      const weatherData = mockWeatherData[normalizedCity];
      
      if (weatherData) {
        setWeather(weatherData);
        setTimeout(() => setIsTransitioning(false), 300);
      } else {
        toast({
          title: "City not found",
          description: "Please try searching for London, Paris, Tokyo, New York, or Dubai",
          variant: "destructive"
        });
        setIsTransitioning(false);
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

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <WeatherBackground weatherCode={weather?.weatherCode} isNight={isNight} />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-7xl space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-6 animate-fade-in">
            <div className="flex items-center justify-center space-x-4 mb-4">
              {isNight ? (
                <Moon className="h-10 w-10 text-yellow-200 animate-pulse" />
              ) : (
                <Sun className="h-10 w-10 text-yellow-400 animate-spin" style={{ animationDuration: '8s' }} />
              )}
              <h1 className="text-6xl font-bold text-white drop-shadow-2xl bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Weather Pro
              </h1>
            </div>
            <div className="flex items-center justify-center space-x-2 text-white/90">
              <Calendar className="h-5 w-5" />
              <p className="text-xl font-medium">{getCurrentDate()}</p>
            </div>
          </div>

          {/* Search Section */}
          <Card className="backdrop-blur-lg bg-white/15 border-white/25 shadow-2xl transition-all duration-300 hover:bg-white/20">
            <CardContent className="p-8 space-y-6">
              <div className="flex space-x-3">
                <Input
                  placeholder="Enter city name..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="bg-white/25 border-white/35 text-white placeholder:text-white/70 focus:bg-white/35 text-lg py-6 transition-all duration-200"
                  disabled={loading}
                />
                <Button 
                  onClick={searchWeather}
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-6 transition-all duration-300 transform hover:scale-105"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent" />
                  ) : (
                    <Search className="h-6 w-6" />
                  )}
                </Button>
              </div>

              {/* Temperature Toggle */}
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => setIsCelsius(!isCelsius)}
                  className="bg-white/15 border-white/35 text-white hover:bg-white/25 transition-all duration-200 px-6 py-2"
                >
                  Switch to {isCelsius ? '°F' : '°C'}
                </Button>
              </div>

              {/* Demo Cities */}
              <div className="space-y-3">
                <p className="text-white/90 text-center font-medium">Popular Cities:</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {['London', 'Paris', 'Tokyo', 'New York', 'Dubai'].map((demoCity) => (
                    <Button
                      key={demoCity}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCity(demoCity);
                        setTimeout(() => searchWeather(), 100);
                      }}
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20 transition-all duration-200 transform hover:scale-105"
                    >
                      {demoCity}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weather Display */}
          {weather && (
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all duration-500 ${isTransitioning ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
              {/* Main Weather Card */}
              <Card className="backdrop-blur-lg bg-white/15 border-white/25 shadow-2xl animate-fade-in col-span-1 lg:col-span-2">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    {/* Location and Temperature */}
                    <div className="text-center lg:text-left space-y-4">
                      <div className="flex items-center justify-center lg:justify-start space-x-3">
                        <MapPin className="h-6 w-6 text-blue-300" />
                        <div>
                          <h2 className="text-2xl font-bold text-white">{weather.name}</h2>
                          <p className="text-white/80 text-lg">{weather.country}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-6xl font-bold text-white animate-scale-in">
                          {convertTemperature(weather.temperature)}°{isCelsius ? 'C' : 'F'}
                        </div>
                        <p className="text-white/90 text-xl capitalize">{weather.description}</p>
                      </div>
                    </div>

                    {/* Weather Icon */}
                    <div className="flex justify-center">
                      <WeatherIcon weatherCode={weather.weatherCode} size={120} isNight={isNight} />
                    </div>

                    {/* Weather Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center space-y-3 p-4 rounded-lg bg-white/10">
                        <Droplets className="h-8 w-8 text-blue-300 mx-auto" />
                        <div className="text-white/70 text-sm">Humidity</div>
                        <div className="text-white font-bold text-xl">{weather.humidity}%</div>
                      </div>
                      <div className="text-center space-y-3 p-4 rounded-lg bg-white/10">
                        <Wind className="h-8 w-8 text-gray-300 mx-auto" />
                        <div className="text-white/70 text-sm">Wind Speed</div>
                        <div className="text-white font-bold text-xl">{weather.windSpeed} km/h</div>
                      </div>
                      <div className="text-center space-y-3 p-4 rounded-lg bg-white/10">
                        <Gauge className="h-8 w-8 text-yellow-300 mx-auto" />
                        <div className="text-white/70 text-sm">Pressure</div>
                        <div className="text-white font-bold text-xl">{weather.pressure} hPa</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map Card */}
              <Card className="backdrop-blur-lg bg-white/15 border-white/25 shadow-2xl animate-fade-in col-span-1 lg:col-span-2">
                <CardContent className="p-6">
                  <h3 className="text-white text-2xl font-bold mb-6 text-center flex items-center justify-center space-x-2">
                    <MapPin className="h-6 w-6" />
                    <span>Location Map</span>
                  </h3>
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <GoogleMap 
                      lat={weather.lat} 
                      lng={weather.lng} 
                      zoom={10}
                      className="w-full h-80"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Welcome Message */}
          {!weather && !loading && (
            <Card className="backdrop-blur-lg bg-white/15 border-white/25 shadow-2xl animate-fade-in">
              <CardContent className="p-12 text-center">
                <div className="space-y-6">
                  <WeatherIcon weatherCode="sunny" size={80} />
                  <h3 className="text-3xl font-bold text-white">Welcome to Weather Pro</h3>
                  <p className="text-white/80 text-xl max-w-2xl mx-auto">
                    Discover real-time weather information for any city around the world. 
                    Start by searching for your favorite destination above.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
