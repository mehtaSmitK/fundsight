
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Stack } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch } from '../app/store'; // Use properly typed dispatch
import { logout } from '../features/authSlice';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch(); // Use properly typed dispatch

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate('/login');
    } catch (error: any) { // Type the error
      console.error('Logout failed:', error);
    }
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Portfolio', path: '/performance-metrics' },
    { label: 'Mutual Funds', path: '/mutual-funds' },
    { label: 'Tools', path: '/tools' },
    { label: 'Transactions', path: '/transactions' },
  ];

  return (
    <AppBar position="fixed" sx={{ bgcolor: '#1b1a1a', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#fff' }}>
          FundSight
        </Typography>
        <Box>
          {navItems.map((item) => (
            <Button
              key={item.label}
              color="inherit"
              onClick={() => navigate(item.path)}
              sx={{
                mx: 1,
                textTransform: 'none',
                color: location.pathname === item.path ? '#fff' : '#aaa',
                fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                position: 'relative',
                '&::after': location.pathname === item.path
                  ? {
                      content: '""',
                      position: 'absolute',
                      bottom: -2,
                      left: 0,
                      width: '100%',
                      height: 2,
                      bgcolor: '#0070df',
                      borderRadius: '10px',
                    }
                  : {},
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton color="inherit"><SearchIcon /></IconButton>
          <IconButton color="inherit"><NotificationsIcon /></IconButton>
          <IconButton color="inherit"><PersonIcon /></IconButton>
          <IconButton color="inherit" onClick={handleLogout}><LogoutIcon /></IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
