// src/components/ui/performance-chart.tsx
import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}

interface PerformanceChartProps {
  data: ChartData[];
  type?: 'line' | 'bar' | 'pie';
  dataKey?: string;
  xAxisKey?: string;
  colors?: string[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
}

const COLORS = ['#39A78D', '#064462', '#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3'];

export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  data,
  type = 'line',
  dataKey = 'value',
  xAxisKey = 'name',
  colors = COLORS,
  height = 300,
  showGrid = true,
  showLegend = true,
}) => {
  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />}
            <XAxis dataKey={xAxisKey} stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
              }}
            />
            {showLegend && <Legend />}
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={colors[0]}
              strokeWidth={3}
              dot={{ fill: colors[0], r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        );

      case 'bar':
        return (
          <BarChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />}
            <XAxis dataKey={xAxisKey} stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
              }}
            />
            {showLegend && <Legend />}
            <Bar dataKey={dataKey} fill={colors[0]} radius={[8, 8, 0, 0]} />
          </BarChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey={dataKey}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            {showLegend && <Legend />}
          </PieChart>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

