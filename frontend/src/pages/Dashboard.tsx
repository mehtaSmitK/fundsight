import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../app/store';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  IconButton, 
  LinearProgress, 
  Divider, 
  Avatar, 
  Stack,
  Button
} from '@mui/material';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InsightsIcon from '@mui/icons-material/Insights';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BarChartIcon from '@mui/icons-material/BarChart';

const Dashboard: React.FC = () => {
  const { investments, funds } = useSelector((state: RootState) => state.investments);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Trigger animations after component mounts
    setAnimate(true);
  }, []);

  // Calculate some mock data for visualization
  const totalInvestment = investments.reduce((sum, inv) => sum + Number(inv.current_value), 0);
  const totalGrowth = investments.reduce(
    (sum, inv) => sum + (Number(inv.current_value) - Number(inv.initial_value)), 
    0
  );
  const growthPercentage = totalInvestment > 0 
    ? (totalGrowth / (totalInvestment - totalGrowth) * 100).toFixed(1) 
    : '0';
  const isPositiveGrowth = totalGrowth >= 0;

  return (
    <Box sx={{my:4}}>
      {/* Welcome Header with animation */}
      <Box
        sx={{
          mb: 4,
          opacity: animate ? 1 : 0,
          transform: `translateY(${animate ? 0 : '20px'})`,
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
        }}
      >
        <Typography variant="h4" sx={{ color: '#fff', fontWeight: 600, mb: 1 }}>
          Welcome to FundSight
        </Typography>
        <Typography variant="body1" sx={{ color: '#aaa' }}>
          Your personal mutual fund portfolio tracker and analyzer
        </Typography>
      </Box>

      {/* Key Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Total Portfolio Value */}
        <Grid item xs={12} md={4}>
          <Card 
            sx={{ 
              bgcolor: 'rgba(8, 88, 160, 0.2)', 
              borderRadius: 2,
              opacity: animate ? 1 : 0,
              transform: `translateY(${animate ? 0 : '20px'})`,
              transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
              transitionDelay: '0.1s',
              height: '100%',
              boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
              overflow: 'hidden',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-50%',
                width: '20%',
                height: '100%',
                background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)',
                transition: 'all 0.5s',
                animationName: 'shimmer',
                animationDuration: '3s',
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
              },
              '@keyframes shimmer': {
                '0%': { left: '-50%' },
                '100%': { left: '150%' },
              },
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#aaa', mb: 1 }}>
                    TOTAL PORTFOLIO VALUE
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700 }}>
                    ₹{totalInvestment.toLocaleString()}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    {isPositiveGrowth ? (
                      <ArrowUpward fontSize="small" sx={{ color: '#4caf50' }} />
                    ) : (
                      <ArrowDownward fontSize="small" sx={{ color: '#f44336' }} />
                    )}
                    <Typography variant="body2" sx={{ color: isPositiveGrowth ? '#4caf50' : '#f44336', ml: 0.5 }}>
                      {isPositiveGrowth ? '+' : ''}{growthPercentage}%
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#aaa', ml: 1 }}>
                      vs initial investment
                    </Typography>
                  </Box>
                </Box>
                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.1)', p: 1 }}>
                  <AccountBalanceIcon />
                </Avatar>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={80} 
                sx={{ 
                  mt: 3, 
                  bgcolor: 'rgba(255,255,255,0.1)', 
                  '& .MuiLinearProgress-bar': { 
                    bgcolor: '#0070df',
                    animation: animate ? 'growWidth 1.5s ease-out' : 'none',
                    '@keyframes growWidth': {
                      '0%': { width: '0%' },
                      '100%': { width: '80%' },
                    }
                  }
                }}
              />
              <Typography variant="caption" sx={{ color: '#aaa', mt: 0.5, display: 'block' }}>
                80% of your target goal
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Performing Fund */}
        <Grid item xs={12} md={4}>
          <Card 
            sx={{ 
              bgcolor: 'rgba(76, 175, 80, 0.15)', 
              borderRadius: 2,
              opacity: animate ? 1 : 0,
              transform: `translateY(${animate ? 0 : '20px'})`,
              transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
              transitionDelay: '0.2s',
              height: '100%',
              boxShadow: '0 4px 20px rgba(0,0,0,0.25)'
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#aaa', mb: 1 }}>
                    TOP PERFORMING FUND
                  </Typography>
                  <Typography variant="h5" sx={{ color: '#fff', fontWeight: 600 }}>
                    {investments[0]?.best_performing_scheme || 'ICICI Prudential Midcap Fund'}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <ArrowUpward fontSize="small" sx={{ color: '#4caf50' }} />
                    <Typography variant="body2" sx={{ color: '#4caf50', ml: 0.5 }}>
                      {investments[0]?.best_performance_change || '+19%'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#aaa', ml: 1 }}>
                      last 6 months
                    </Typography>
                  </Box>
                </Box>
                <Avatar sx={{ bgcolor: 'rgba(76, 175, 80, 0.2)', p: 1 }}>
                  <TrendingUpIcon />
                </Avatar>
              </Box>
              <Box 
                sx={{ 
                  mt: 2, 
                  p: 1.5, 
                  bgcolor: 'rgba(255,255,255,0.05)', 
                  borderRadius: 1,
                  animation: animate ? 'pulseBackground 3s infinite' : 'none',
                  '@keyframes pulseBackground': {
                    '0%': { backgroundColor: 'rgba(255,255,255,0.05)' },
                    '50%': { backgroundColor: 'rgba(255,255,255,0.1)' },
                    '100%': { backgroundColor: 'rgba(255,255,255,0.05)' },
                  }
                }}
              >
                <Typography variant="body2" sx={{ color: '#ddd' }}>
                  This fund is outperforming 92% of similar funds in its category.
                </Typography>
                <Button 
                  size="small" 
                  sx={{ 
                    mt: 1, 
                    color: '#0070df', 
                    '&:hover': { bgcolor: 'rgba(0,112,223,0.1)' } 
                  }}
                >
                  View Details
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Market Insights */}
        <Grid item xs={12} md={4}>
          <Card 
            sx={{ 
              bgcolor: 'rgba(156, 39, 176, 0.15)', 
              borderRadius: 2,
              opacity: animate ? 1 : 0,
              transform: `translateY(${animate ? 0 : '20px'})`,
              transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
              transitionDelay: '0.3s',
              height: '100%',
              boxShadow: '0 4px 20px rgba(0,0,0,0.25)'
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#aaa', mb: 1 }}>
                    MARKET INSIGHTS
                  </Typography>
                  <Typography variant="h5" sx={{ color: '#fff', fontWeight: 600 }}>
                    Sensex & Nifty
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <ArrowUpward fontSize="small" sx={{ color: '#4caf50' }} />
                    <Typography variant="body2" sx={{ color: '#4caf50', ml: 0.5 }}>
                      +1.2%
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#aaa', ml: 1 }}>
                      today
                    </Typography>
                  </Box>
                </Box>
                <Avatar sx={{ bgcolor: 'rgba(156, 39, 176, 0.2)', p: 1 }}>
                  <InsightsIcon />
                </Avatar>
              </Box>
              <Stack 
                direction="row" 
                spacing={2} 
                mt={2} 
                sx={{ 
                  opacity: animate ? 1 : 0, 
                  transition: 'opacity 1s ease-out',
                  transitionDelay: '0.8s'  
                }}
              >
                <Card sx={{ flex: 1, bgcolor: 'rgba(255,255,255,0.05)' }}>
                  <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                    <Typography variant="caption" sx={{ color: '#aaa' }}>SENSEX</Typography>
                    <Typography variant="body1" sx={{ color: '#fff', fontWeight: 600 }}>72,150</Typography>
                    <Typography variant="caption" sx={{ color: '#4caf50' }}>+452 pts</Typography>
                  </CardContent>
                </Card>
                <Card sx={{ flex: 1, bgcolor: 'rgba(255,255,255,0.05)' }}>
                  <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                    <Typography variant="caption" sx={{ color: '#aaa' }}>NIFTY</Typography>
                    <Typography variant="body1" sx={{ color: '#fff', fontWeight: 600 }}>21,800</Typography>
                    <Typography variant="caption" sx={{ color: '#4caf50' }}>+153 pts</Typography>                 
                  </CardContent>
                </Card>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Funds Section */}
      <Paper
        sx={{
          p: 3,
          bgcolor: 'rgba(0, 0, 0, 0.2)',
          borderRadius: 2,
          mb: 4,
          opacity: animate ? 1 : 0,
          transform: `translateY(${animate ? 0 : '20px'})`,
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          transitionDelay: '0.4s',
          boxShadow: '0 4px 20px rgba(0,0,0,0.25)'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>
            Your Investment Portfolio
          </Typography>
          <Box>
            <Button 
              variant="outlined" 
              size="small" 
              startIcon={<BarChartIcon />}
              sx={{ 
                borderColor: '#0070df', 
                color: '#0070df',
                '&:hover': { borderColor: '#0070df', bgcolor: 'rgba(0,112,223,0.1)' },
                mr: 2
              }}
              onClick={() => navigate('/performance-metrics')}
            >
              View Detailed Analysis
            </Button>
          </Box>
        </Box>
      </Paper>

    
    </Box>
  );
};

export default Dashboard;