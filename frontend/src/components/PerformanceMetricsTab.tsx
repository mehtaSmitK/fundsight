import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface PerformanceMetricsTabProps {
  investment: any;
  chartData: any[];
  selectedPeriod: string;
  timePeriods: string[];
  handlePeriodChange: (event: React.MouseEvent<HTMLElement>, newPeriod: string | null) => void;
}

const PerformanceMetricsTab: React.FC<PerformanceMetricsTabProps> = ({
  investment,
  chartData,
  selectedPeriod,
  timePeriods,
  handlePeriodChange,
}) => {
  return (
    <Paper sx={{ bgcolor: '#1b1a1a', borderRadius: '11px', p: 3, mb: 3, height: 453 }}>
      <Typography variant="subtitle1" sx={{ color: '#aaa', mb: 2 }}>
        Performance Summary
      </Typography>

      {/* Performance Summary Card */}
      {investment && (
        <Card sx={{ bgcolor: '#222', width: 161, height: 67, borderRadius: 1, mb: 3 }}>
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Typography variant="h6" sx={{ color: '#ddd' }}>
              ₹{investment.current_value.toLocaleString()}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <ArrowUpward fontSize="small" sx={{ color: '#4caf50' }} />
              <Typography variant="body2" sx={{ color: '#4caf50' }}>
                ₹{(investment.current_value - investment.initial_value).toLocaleString()}
              </Typography>
              <Divider orientation="vertical" sx={{ bgcolor: '#4caf50', height: 11 }} />
              <Typography variant="body2" sx={{ color: '#4caf50' }}>
                {((investment.current_value - investment.initial_value) / investment.initial_value * 100).toFixed(1)}%
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* Line Chart */}
      <Box sx={{ height: 200, position: 'relative', mb: 2 }}>
        <LineChart
          width={900}
          height={200}
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
          <XAxis
            dataKey="date"
            stroke="#aaa"
            tick={{ fontSize: 12, fill: '#aaa' }}
            tickMargin={10}
          />
          <YAxis
            stroke="#aaa"
            tick={{ fontSize: 12, fill: '#aaa' }}
            tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
            domain={['auto', 'auto']}
            tickCount={6}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#333',
              border: '0.5px solid #0080ff',
              borderRadius: 4,
            }}
            labelStyle={{ color: '#aaa' }}
            formatter={(value: number) => `₹${value.toLocaleString()}`}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#14b8ff"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </Box>

      {/* Time Period Toggles */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <ToggleButtonGroup
          value={selectedPeriod}
          exclusive
          onChange={handlePeriodChange}
          sx={{
            '& .MuiToggleButton-root': {
              width: 66,
              height: 26,
              color: '#aaa',
              border: '1px solid #454545',
              '&.Mui-selected': {
                bgcolor: '#0070df',
                color: '#fff',
              },
            },
          }}
        >
          {timePeriods.map((period) => (
            <ToggleButton
              key={period}
              value={period}
              sx={{
                textTransform: 'none',
                fontSize: '14px',
              }}
            >
              {period}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
    </Paper>
  );
};

export default PerformanceMetricsTab;
