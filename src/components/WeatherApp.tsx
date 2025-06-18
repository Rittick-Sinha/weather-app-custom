import React, { useState } from 'react';
import { Search, MapPin, Droplets, Wind, Gauge, Calendar, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import WeatherIcon from './WeatherIcon';
import WeatherBackground from './WeatherBackground';
import GoogleMap from './GoogleMap';
import Weather3DGlobe from './Weather3DGlobe';
import Weather3DCard from './Weather3DCard';

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
          <motion.div 
            className="text-center space-y-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center space-x-4 mb-4">
              {isNight ? (
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Moon className="h-10 w-10 text-yellow-200" />
                </motion.div>
              ) : (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Sun className="h-10 w-10 text-yellow-400" />
                </motion.div>
              )}
              <motion.h1 
                className="text-6xl font-bold text-white drop-shadow-2xl bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
                animate={{
                  textShadow: [
                    "0 0 10px rgba(255,255,255,0.5)",
                    "0 0 20px rgba(255,255,255,0.8)",
                    "0 0 10px rgba(255,255,255,0.5)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Weather Pro
              </motion.h1>
            </div>
            <motion.div 
              className="flex items-center justify-center space-x-2 text-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Calendar className="h-5 w-5" />
              <p className="text-xl font-medium">{getCurrentDate()}</p>
            </motion.div>
          </motion.div>

          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
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
                      <motion.div 
                        className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      <Search className="h-6 w-6" />
                    )}
                  </Button>
                </div>

                {/* Temperature Toggle */}
                <div className="flex justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      onClick={() => setIsCelsius(!isCelsius)}
                      className="bg-white/15 border-white/35 text-white hover:bg-white/25 transition-all duration-200 px-6 py-2"
                    >
                      Switch to {isCelsius ? '°F' : '°C'}
                    </Button>
                  </motion.div>
                </div>

                {/* Demo Cities */}
                <div className="space-y-3">
                  <p className="text-white/90 text-center font-medium">Popular Cities:</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {['London', 'Paris', 'Tokyo', 'New York', 'Dubai'].map((demoCity, index) => (
                      <motion.div
                        key={demoCity}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setCity(demoCity);
                            setTimeout(() => searchWeather(), 100);
                          }}
                          className="bg-white/10 border-white/30 text-white hover:bg-white/20 transition-all duration-200"
                        >
                          {demoCity}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Weather Display */}
          <AnimatePresence mode="wait">
            {weather && (
              <motion.div 
                key={weather.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {/* 3D Globe and Main Weather Info */}
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Card className="backdrop-blur-lg bg-white/15 border-white/25 shadow-2xl">
                    <CardContent className="p-8 text-center">
                      <div className="flex items-center justify-center space-x-3 mb-6">
                        <MapPin className="h-6 w-6 text-blue-300" />
                        <div>
                          <h2 className="text-2xl font-bold text-white">{weather.name}</h2>
                          <p className="text-white/80 text-lg">{weather.country}</p>
                        </div>
                      </div>

                      {/* 3D Globe */}
                      <Weather3DGlobe 
                        weatherCode={weather.weatherCode}
                        temperature={convertTemperature(weather.temperature)}
                        isNight={isNight}
                      />

                      <motion.p 
                        className="text-white/90 text-xl capitalize mt-4"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {weather.description}
                      </motion.p>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* 3D Weather Stats */}
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="space-y-4"
                >
                  <Weather3DCard
                    icon={Droplets}
                    label="Humidity"
                    value={weather.humidity}
                    unit="%"
                    color="text-blue-300"
                    index={0}
                  />
                  <Weather3DCard
                    icon={Wind}
                    label="Wind Speed"
                    value={weather.windSpeed}
                    unit=" km/h"
                    color="text-gray-300"
                    index={1}
                  />
                  <Weather3DCard
                    icon={Gauge}
                    label="Pressure"
                    value={weather.pressure}
                    unit=" hPa"
                    color="text-yellow-300"
                    index={2}
                  />
                </motion.div>

                {/* Map Card */}
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="lg:col-span-2"
                >
                  <Card className="backdrop-blur-lg bg-white/15 border-white/25 shadow-2xl">
                    <CardContent className="p-6">
                      <h3 className="text-white text-2xl font-bold mb-6 text-center flex items-center justify-center space-x-2">
                        <MapPin className="h-6 w-6" />
                        <span>Location Map</span>
                      </h3>
                      <motion.div 
                        className="rounded-lg overflow-hidden shadow-lg"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <GoogleMap 
                          lat={weather.lat} 
                          lng={weather.lng} 
                          zoom={10}
                          className="w-full h-80"
                        />
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Welcome Message */}
          {!weather && !loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="backdrop-blur-lg bg-white/15 border-white/25 shadow-2xl">
                <CardContent className="p-12 text-center">
                  <div className="space-y-6">
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <WeatherIcon weatherCode="sunny" size={80} />
                    </motion.div>
                    <motion.h3 
                      className="text-3xl font-bold text-white"
                      animate={{
                        textShadow: [
                          "0 0 10px rgba(255,255,255,0.3)",
                          "0 0 20px rgba(255,255,255,0.6)",
                          "0 0 10px rgba(255,255,255,0.3)"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      Welcome to Weather Pro
                    </motion.h3>
                    <motion.p 
                      className="text-white/80 text-xl max-w-2xl mx-auto"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      Discover real-time weather information for any city around the world. 
                      Start by searching for your favorite destination above.
                    </motion.p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
