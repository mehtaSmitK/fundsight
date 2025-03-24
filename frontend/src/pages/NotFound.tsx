import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setFadeIn(true);
  }, []);

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: 'calc(100vh - 64px)',
        color: '#fff',
        opacity: fadeIn ? 1 : 0,
        transform: `translateY(${fadeIn ? 0 : '20px'})`,
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
      }}
    >
      <Typography 
        variant="h1" 
        sx={{ 
          fontSize: { xs: '80px', md: '120px' }, 
          fontWeight: 'bold',
          mb: 2,
          animation: 'pulse 2s infinite ease-in-out',
          '@keyframes pulse': {
            '0%': { opacity: 1, transform: 'scale(1)' },
            '50%': { opacity: 0.8, transform: 'scale(1.05)' },
            '100%': { opacity: 1, transform: 'scale(1)' },
          }
        }}
      >
        404
      </Typography>
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 4,
          animation: 'slideIn 1s ease-out',
          '@keyframes slideIn': {
            '0%': { opacity: 0, transform: 'translateY(20px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' },
          }
        }}
      >
        Page Not Found
      </Typography>
      <Typography 
        variant="body1" 
        sx={{ 
          mb: 4, 
          maxWidth: '500px', 
          textAlign: 'center',
          opacity: fadeIn ? 1 : 0,
          transition: 'opacity 1.2s ease-out',
          transitionDelay: '0.3s',
        }}
      >
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </Typography>
      <Button 
        variant="contained" 
        onClick={() => navigate('/')} 
        sx={{ 
          mt: 2,
          bgcolor: '#333',
          '&:hover': {
            bgcolor: '#444',
          },
          animation: 'fadeIn 1.5s ease-out',
          '@keyframes fadeIn': {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          }
        }}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;