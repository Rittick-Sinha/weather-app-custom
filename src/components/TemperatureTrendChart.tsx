
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface TemperatureData {
  year: number;
  temperature: number;
}

interface TemperatureTrendChartProps {
  cityName: string;
  isCelsius: boolean;
}

const TemperatureTrendChart: React.FC<TemperatureTrendChartProps> = ({ cityName, isCelsius }) => {
  // Mock historical temperature data for demonstration
  const generateTemperatureData = (city: string): TemperatureData[] => {
    const baseTemp = {
      london: 12,
      paris: 15,
      tokyo: 18,
      newyork: 14,
      dubai: 32
    }[city.toLowerCase().replace(/\s+/g, '')] || 15;

    const data: TemperatureData[] = [];
    const currentYear = new Date().getFullYear();
    
    for (let i = 10; i >= 0; i--) {
      const year = currentYear - i;
      // Add some realistic variation
      const variation = (Math.random() - 0.5) * 4;
      const temperature = baseTemp + variation;
      data.push({
        year,
        temperature: Math.round(temperature * 10) / 10
      });
    }
    
    return data;
  };

  const temperatureData = generateTemperatureData(cityName);

  const convertTemperature = (temp: number) => {
    return isCelsius ? temp : Math.round((temp * 9/5) + 32);
  };

  const formatTooltipValue = (value: number) => {
    const convertedTemp = convertTemperature(value);
    return [`${convertedTemp}°${isCelsius ? 'C' : 'F'}`, 'Avg Temperature'];
  };

  return (
    <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Temperature Trend - {cityName}
        </CardTitle>
        <p className="text-white/60 text-sm">Average annual temperature over the last 10 years</p>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={temperatureData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
              <XAxis 
                dataKey="year" 
                stroke="rgba(255,255,255,0.8)"
                fontSize={12}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.8)"
                fontSize={12}
                tickFormatter={(value) => `${convertTemperature(value)}°`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: 'white'
                }}
                formatter={formatTooltipValue}
                labelStyle={{ color: 'white' }}
              />
              <Line 
                type="monotone" 
                dataKey="temperature" 
                stroke="#60A5FA" 
                strokeWidth={3}
                dot={{ fill: '#60A5FA', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#60A5FA', strokeWidth: 2, fill: 'white' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemperatureTrendChart;
