
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Cloud, Sun, CloudRain, Wind } from 'lucide-react';

interface Weather3DGlobeProps {
  weatherCode: string;
  temperature: number;
  isNight: boolean;
}

const Weather3DGlobe: React.FC<Weather3DGlobeProps> = ({ weatherCode, temperature, isNight }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]));
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]));

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const getWeatherIcon = () => {
    const iconProps = { size: 40, className: "text-white/80" };
    switch (weatherCode) {
      case 'sunny': return <Sun {...iconProps} className="text-yellow-300" />;
      case 'cloudy': return <Cloud {...iconProps} className="text-gray-300" />;
      case 'rainy': return <CloudRain {...iconProps} className="text-blue-300" />;
      case 'windy': return <Wind {...iconProps} className="text-gray-400" />;
      default: return <Sun {...iconProps} className="text-yellow-300" />;
    }
  };

  const getGradientColors = () => {
    if (isNight) {
      return 'from-indigo-900 via-purple-800 to-blue-900';
    }
    switch (weatherCode) {
      case 'sunny': return 'from-orange-400 via-yellow-400 to-amber-300';
      case 'cloudy': return 'from-gray-500 via-slate-400 to-gray-300';
      case 'rainy': return 'from-blue-600 via-blue-500 to-cyan-400';
      default: return 'from-blue-500 via-cyan-400 to-teal-300';
    }
  };

  return (
    <div 
      className="flex justify-center items-center h-80 w-80 mx-auto"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="relative"
      >
        {/* Main Globe */}
        <motion.div
          className={`w-64 h-64 rounded-full bg-gradient-to-br ${getGradientColors()} 
                     shadow-2xl relative overflow-hidden cursor-pointer`}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          {/* Atmosphere Glow */}
          <div className="absolute inset-0 rounded-full bg-white/10 blur-sm"></div>
          
          {/* Weather Patterns */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-white/20 rounded-full"
                style={{
                  top: `${20 + Math.sin(i * 0.8) * 30}%`,
                  left: `${20 + Math.cos(i * 0.8) * 30}%`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>

          {/* Central Weather Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {getWeatherIcon()}
            </motion.div>
          </div>

          {/* Temperature Display */}
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 
                       text-white font-bold text-2xl"
            animate={{
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            {temperature}°
          </motion.div>
        </motion.div>

        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `translateZ(${Math.random() * 100 - 50}px)`
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}

        {/* Ring Elements */}
        <motion.div
          className="absolute inset-0 border-2 border-white/20 rounded-full"
          style={{ transform: "translateZ(20px)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        <motion.div
          className="absolute inset-4 border border-white/10 rounded-full"
          style={{ transform: "translateZ(-20px)" }}
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
};

export default Weather3DGlobe;
