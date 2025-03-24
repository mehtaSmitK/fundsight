import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Checkbox, 
  FormControlLabel, 
  Link, 
  Paper, 
  InputAdornment, 
  IconButton,
  CircularProgress,
  Alert
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { login } from '../features/authSlice';
import { useAppDispatch } from '../app/store';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error: authError, isAuthenticated } = useSelector((state: any) => state.auth);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Start animation after component mounts
    setAnimate(true);
  }, []);
  
  // Add useEffect to navigate on successful login
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (authError) {
      setError(authError || 'Invalid email or password. Try with demo@fundsight.com/SecurePass123!');
    }
  }, [authError]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Use Redux auth action instead of direct fetch
    dispatch(login({ email, password }));
    
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      bgcolor: '#171616'
    }}>
      {/* Left side - Animated SVG */}
      <Box 
        sx={{ 
          flex: 1, 
          display: { xs: 'none', md: 'flex' },
          justifyContent: 'center',
          alignItems: 'center',
          p: 6,
          opacity: animate ? 1 : 0,
          transform: `translateX(${animate ? 0 : '-40px'})`,
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
        }}
      >
        <Box sx={{ width: '80%', maxWidth: 500 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              color: '#fff', 
              mb: 4, 
              fontWeight: 700,
              textAlign: 'center',
              opacity: animate ? 1 : 0,
              transition: 'opacity 0.8s ease-out',
              transitionDelay: '0.3s',
            }}
          >
            FundSight
          </Typography>
          
          {/* Animated SVG */}
          <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
            {/* Graph Line */}
            <path
              d="M50,300 Q125,100 200,250 T350,150 T450,200"
              fill="none"
              stroke="#0070df"
              strokeWidth="4"
              strokeDasharray="1200"
              strokeDashoffset={animate ? "0" : "1200"}
              style={{
                transition: "stroke-dashoffset 2s ease-out",
              }}
            />
            
            {/* Graph Points */}
            {[
              { cx: 50, cy: 300, delay: 0.5 },
              { cx: 125, cy: 100, delay: 0.8 },
              { cx: 200, cy: 250, delay: 1.1 },
              { cx: 275, cy: 175, delay: 1.4 },
              { cx: 350, cy: 150, delay: 1.7 },
              { cx: 450, cy: 200, delay: 2.0 },
            ].map((point, index) => (
              <circle
                key={index}
                cx={point.cx}
                cy={point.cy}
                r="8"
                fill="#0070df"
                opacity={animate ? "1" : "0"}
                style={{
                  transition: `opacity 0.5s ease-out ${point.delay}s, r 0.5s ease-out`,
                }}
                onMouseOver={(e) => (e.currentTarget.setAttribute("r", "12"))}
                onMouseOut={(e) => (e.currentTarget.setAttribute("r", "8"))}
              />
            ))}
            
            {/* Animated Coins */}
            {[1, 2, 3].map((_, i) => (
              <g
                key={i}
                opacity={animate ? 1 : 0}
                style={{
                  transition: `opacity 0.5s ease-out ${1 + i * 0.2}s`,
                  animation: animate ? `float ${3 + i * 0.5}s ease-in-out infinite alternate ${i * 0.5}s` : 'none',
                }}
              >
                <circle
                  cx={150 + i * 100}
                  cy={320 - i * 30}
                  r="20"
                  fill="#f8d07b"
                />
                <circle
                  cx={150 + i * 100}
                  cy={320 - i * 30}
                  r="15"
                  fill="#e6b840"
                />
                <text
                  x={150 + i * 100}
                  y={325 - i * 30}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="bold"
                  fill="#171616"
                >
                  ₹
                </text>
              </g>
            ))}
          </svg>
          
          <style>
            {`
              @keyframes float {
                0% { transform: translateY(0); }
                100% { transform: translateY(-15px); }
              }
            `}
          </style>
          
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#aaa', 
              mt: 4,
              textAlign: 'center',
              opacity: animate ? 1 : 0,
              transition: 'opacity 0.8s ease-out',
              transitionDelay: '1s'
            }}
          >
            Your personal mutual fund portfolio tracker
          </Typography>
        </Box>
      </Box>
      
      {/* Right side - Login Form */}
      <Box 
        sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center',
          p: { xs: 4, sm: 6, md: 8 },
          opacity: animate ? 1 : 0,
          transform: `translateX(${animate ? 0 : '40px'})`,
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
        }}
      >
        <Paper 
          elevation={4}
          sx={{ 
            p: { xs: 3, sm: 4, md: 5 }, 
            borderRadius: 2,
            maxWidth: 450,
            width: '100%',
            mx: 'auto',
            bgcolor: 'rgba(27, 26, 26, 0.8)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)'
          }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 1, 
              color: '#fff',
              fontWeight: 600,
              textAlign: 'center'
            }}
          >
            Welcome Back
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 4, 
              color: '#aaa',
              textAlign: 'center'
            }}
          >
            Sign in to access your portfolio
          </Typography>
          
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3, 
                bgcolor: 'rgba(211, 47, 47, 0.1)', 
                color: '#f44336',
                '& .MuiAlert-icon': { color: '#f44336' }
              }}
            >
              {error}
            </Alert>
          )}
          
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: '#aaa' }}/>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'rgba(255,255,255,0.05)',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#0070df'
                  }
                }
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: '#aaa' }}/>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: '#aaa' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'rgba(255,255,255,0.05)',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#0070df'
                  }
                }
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={rememberMe} 
                    onChange={(e) => setRememberMe(e.target.checked)}
                    sx={{ 
                      color: '#aaa',
                      '&.Mui-checked': {
                        color: '#0070df',
                      }
                    }}
                  />
                }
                label="Remember me"
                sx={{ color: '#aaa' }}
              />
              <Link href="#" underline="hover" sx={{ color: '#0070df' }}>
                Forgot password?
              </Link>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 2,
                mb: 3,
                py: 1.5,
                bgcolor: '#0070df',
                '&:hover': {
                  bgcolor: '#0058b7',
                },
                position: 'relative',
                overflow: 'hidden',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  transition: 'all 0.5s',
                },
                '&:hover::after': {
                  left: '100%',
                }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>
            <Typography variant="body2" align="center" sx={{ color: '#aaa' }}>
              Don't have an account?{' '}
              <Link href="#" underline="hover" sx={{ color: '#0070df' }}>
                Sign up
              </Link>
            </Typography>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;