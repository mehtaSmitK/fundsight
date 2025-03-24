import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import PerformanceMetricsTab from '../components/PerformanceMetricsTab';
import PortfolioCompositionTab from '../components/PortfolioCompositionTab';
import { fetchInvestments, fetchFunds, setSelectedUser } from '../features/investmentSlice';
import { RootState, AppDispatch } from '../app/store';

interface MetricCard {
  id: number;
  title: string;
  value: string;
  change: string;
  changeLabel?: string;
  isPositive: boolean;
}

interface SectorData {
  id: number;
  name: string;
  amount: string;
  percentage: string;
  bgcolor: string;
  gridSize: { xs: number; md: number };
}

const PerformanceMetrics: React.FC = () => {
  // Redux state and dispatch
  const dispatch = useDispatch<AppDispatch>();
  const { investments, funds, selectedUser, status, error } = useSelector(
    (state: RootState) => state.investments
  );

  // State for tab navigation and time period
  const [tabValue, setTabValue] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState('1M');
  const timePeriods = ['1M', '3M', '6M', '1Y', '3Y', 'MAX'];

  // Fetch data on component mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchInvestments());
      dispatch(fetchFunds());
    }
  }, [dispatch, status]);

  // Get current investment based on selected user
  const investment = useSelector((state: RootState) => 
    state.investments.investments.find(inv => inv.user_name === state.investments.selectedUser)
  );

  // Handle user selection
  const handleUserChange = (event: SelectChangeEvent<string>) => {
    dispatch(setSelectedUser(event.target.value as string));
  };

  // Handle tab and period changes
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handlePeriodChange = (event: React.MouseEvent<HTMLElement>, newPeriod: string | null) => {
    if (newPeriod) {
      setSelectedPeriod(newPeriod);
    }
  };

  // Prepare data for the frontend
  const metricCards: MetricCard[] = investment ? (() => {
    // Calculate 1-day return if performance history exists
    let oneDayReturn = '0%';
    let isPositive = true;
    if (investment.performance_history && investment.performance_history.length >= 2) {
      const latestValue = investment.performance_history[investment.performance_history.length - 1].value;
      const previousValue = investment.performance_history[investment.performance_history.length - 2].value;
      const change = ((latestValue - previousValue) / previousValue) * 100;
      oneDayReturn = `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
      isPositive = change >= 0;
    }

    // Calculate overall return since initial investment
    const overallReturn = ((investment.current_value - investment.initial_value) / investment.initial_value) * 100;
    const overallReturnStr = `${overallReturn >= 0 ? '+' : ''}${overallReturn.toFixed(1)}%`;

    // Check if best performance change is positive (could be null or not start with '+')
    const bestPerformanceChange = investment.best_performance_change || '0%';
    const isBestPerformancePositive = bestPerformanceChange.startsWith('+');

    // Check if worst performance change is negative (could be null or not start with '-')
    const worstPerformanceChange = investment.worst_performance_change || '0%';
    const isWorstPerformanceNegative = worstPerformanceChange.startsWith('-');

    return [
      {
        id: 1,
        title: 'Current Investment Value',
        value: `₹${investment.current_value.toLocaleString()}`,
        change: oneDayReturn,
        changeLabel: '1D Return',
        isPositive: isPositive,
      },
      {
        id: 2,
        title: 'Initial Investment Value',
        value: `₹${investment.initial_value.toLocaleString()}`,
        change: overallReturnStr,
        isPositive: overallReturn >= 0,
      },
      {
        id: 3,
        title: 'Best Performing Scheme',
        value: investment.best_performing_scheme || 'No data',
        change: bestPerformanceChange,
        isPositive: isBestPerformancePositive,
      },
      {
        id: 4,
        title: 'Worst Performing Scheme',
        value: investment.worst_performing_scheme || 'No data',
        change: worstPerformanceChange, 
        isPositive: !isWorstPerformanceNegative,
      },
    ];
  })() : [];

  // Filter performance history based on selected time period
  const filterChartData = (data: any[]) => {
    if (!data || data.length === 0) return [];

    const now = new Date();
    let startDate: Date;
    switch (selectedPeriod) {
      case '1M':
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case '3M':
        startDate = new Date(now.setMonth(now.getMonth() - 3));
        break;
      case '6M':
        startDate = new Date(now.setMonth(now.getMonth() - 6));
        break;
      case '1Y':
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      case '3Y':
        startDate = new Date(now.setFullYear(now.getFullYear() - 3));
        break;
      case 'MAX':
      default:
        startDate = new Date(0);  // Show all data
        break;
    }

    return data
      .filter(entry => new Date(entry.date) >= startDate)
      .map(entry => ({
        date: new Date(entry.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        value: entry.value,
      }));
  };

  const chartData = investment ? filterChartData(investment.performance_history) : [];

  const sectorData: SectorData[] = investment ? investment.sector_allocations.map((sector: any, index: number) => ({
    id: index + 1,
    name: sector.name,
    amount: `₹${Math.round(sector.amount).toLocaleString()}`,
    percentage: sector.percentage,
    bgcolor: sector.bgcolor,
    gridSize: index === 0 ? { xs: 12, md: 8 } : index === 1 ? { xs: 12, md: 4 } : { xs: 12, md: 2.67 },
  })) : [];

  // Prepare Sankey diagram data
  const prepareSankeyData = () => {
    const data: any[] = [['From', 'To', 'Weight']];
    funds.forEach(fund => {
      fund.holdings.forEach((holding: { stock: string; weight: number }) => {
        data.push([fund.name, holding.stock, holding.weight]);
      });
    });
    return data;
  };

  // Sankey chart options
  const sankeyOptions = {
    sankey: {
      node: {
        colors: [...funds.map((fund: any) => fund.color), ...Array(18).fill('#A0A0A0')], // Colors for funds and stocks
        label: {
          fontName: 'Roboto',
          fontSize: 14,
          color: '#A0A0A0',
          bold: true,
        },
        nodePadding: 30,
        width: 5,
      },
      link: {
        colorMode: 'gradient',
        colors: funds.map((fund: any) => {
          // Check if the color already has a # prefix
          const colorWithPrefix = fund.color.startsWith('#') ? fund.color : `#${fund.color}`;
          // Append 66 for transparency
          return `${colorWithPrefix}`;
        }),
        fillOpacity: 0.3,
      },
    },
    backgroundColor: 'transparent',
    height: 447,
    width: 851,
  };

  return (
    <Box>
      {/* User Selection Dropdown */}
      <Box sx={{ my: 4 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel sx={{ color: '#fff' }}>Select User</InputLabel>
          <Select
            value={selectedUser}
            onChange={handleUserChange}
            label="Select User"
            sx={{
              color: '#fff',
              '.MuiOutlinedInput-notchedOutline': { borderColor: '#aaa' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
              '& .MuiSvgIcon-root': { color: '#fff' },
            }}
          >
            {investments.map(inv => (
              <MenuItem key={inv.user_name} value={inv.user_name}>
                {inv.user_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Show loading, error, or content */}
      {status === 'loading' && <Typography color="white">Loading...</Typography>}
      {status === 'failed' && <Typography color="error">{error}</Typography>}
      {status === 'succeeded' && (
        <>
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ color: '#fff', mb: 1 }}>
              Good morning, {selectedUser || 'User'}!
            </Typography>
            <Typography variant="body1" sx={{ color: '#fff' }}>
              Evaluate Your Investment Performance
            </Typography>
          </Box>

          {/* Metric Cards */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {metricCards.map((card) => (
              <Grid item xs={12} sm={6} md={3} key={card.id}>
                <Card
                  sx={{
                    bgcolor: 'rgba(8, 88, 160, 0.2)',
                    borderRadius: '11px',
                    height: 104,
                  }}
                >
                  <CardContent sx={{ position: 'relative', height: '100%', p: 2 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Box
                        sx={{
                          width: 2,
                          height: 40,
                          bgcolor: '#b2efff',
                          borderRadius: 1,
                        }}
                      />
                      <Typography variant="body2" sx={{ color: '#fff', lineHeight: 1.2 }}>
                        {card.title}
                      </Typography>
                      <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                        {card.isPositive ? (
                          <ArrowUpward fontSize="small" sx={{ color: '#4caf50' }} />
                        ) : (
                          <ArrowDownward fontSize="small" sx={{ color: '#f44336' }} />
                        )}
                        <Typography
                          variant="body2"
                          sx={{ color: card.isPositive ? '#4caf50' : '#f44336' }}
                        >
                          {card.change}
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography variant="h6" sx={{ color: '#ddd', mt: 1, ml: 2 }}>
                      {card.value}
                    </Typography>
                    {card.changeLabel && (
                      <Typography
                        variant="caption"
                        sx={{ color: '#4caf50', position: 'absolute', right: 16, top: 24 }}
                      >
                        {card.changeLabel}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: '#454545', mb: 3 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{ '& .MuiTabs-indicator': { bgcolor: '#0858a0', height: 4 } }}
            >
              <Tab
                label="Performance Metrics"
                sx={{
                  color: tabValue === 0 ? '#fff' : '#aaa',
                  fontWeight: tabValue === 0 ? 600 : 400,
                  textTransform: 'none',
                  minWidth: 200,
                }}
              />
              <Tab
                label="Portfolio Composition"
                sx={{
                  color: tabValue === 1 ? '#fff' : '#aaa',
                  fontWeight: tabValue === 1 ? 600 : 400,
                  textTransform: 'none',
                  minWidth: 200,
                }}
              />
            </Tabs>
          </Box>

          {/* Tab Content */}
          {tabValue === 0 && (
            <PerformanceMetricsTab 
              investment={investment}
              chartData={chartData}
              selectedPeriod={selectedPeriod}
              timePeriods={timePeriods}
              handlePeriodChange={handlePeriodChange}
            />
          )}

          {tabValue === 1 && (
            <PortfolioCompositionTab 
              sectorData={sectorData}
              sankeyData={prepareSankeyData()}
              sankeyOptions={sankeyOptions}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default PerformanceMetrics;