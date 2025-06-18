
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface Weather3DCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  unit?: string;
  color: string;
  index: number;
}

const Weather3DCard: React.FC<Weather3DCardProps> = ({ 
  icon: Icon, 
  label, 
  value, 
  unit, 
  color, 
  index 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -30 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100 
      }}
      whileHover={{ 
        scale: 1.05, 
        rotateY: 10,
        z: 20
      }}
      className="relative group"
      style={{
        transformStyle: "preserve-3d"
      }}
    >
      {/* Card Shadow */}
      <div className="absolute inset-0 bg-black/20 rounded-xl transform translate-y-2 blur-sm group-hover:translate-y-3 transition-transform duration-300" />
      
      {/* Main Card */}
      <div className="relative bg-white/15 backdrop-blur-lg rounded-xl p-6 border border-white/25 
                      shadow-xl transform transition-all duration-300 group-hover:shadow-2xl">
        {/* Icon */}
        <motion.div
          className={`${color} mb-4 transform transition-transform duration-300 group-hover:scale-110`}
          animate={{
            rotateY: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Icon size={32} />
        </motion.div>

        {/* Label */}
        <p className="text-white/70 text-sm font-medium mb-2">{label}</p>

        {/* Value */}
        <motion.div
          className="text-white font-bold text-2xl"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2
          }}
        >
          {value}{unit && <span className="text-lg text-white/80">{unit}</span>}
        </motion.div>

        {/* Highlight Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.3 }}
        />

        {/* Floating Elements */}
        <motion.div
          className="absolute -top-2 -right-2 w-4 h-4 bg-white/20 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.3
          }}
        />
      </div>
    </motion.div>
  );
};

export default Weather3DCard;
