import React from 'react';
import { Box, Drawer, List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from './NavBar';

const drawerWidth = 200;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const sideNavItems = [
    { label: 'PHA', path: '/pha' },
    { label: 'Fund Analysis', path: '/fund-analysis' },
    { label: 'Holdings', path: '/holdings' },
    { label: 'Transactions', path: '/transactions' },
  ];

  return (
    <Box sx={{ display: 'flex', bgcolor: '#171616', minHeight: '100vh' }}>
      <NavBar />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, bgcolor: '#1b1a1a', color: '#fff' },
        }}
      >
        <Box sx={{ height: 64 }} /> {/* Spacer for AppBar */}
        <List>
          {sideNavItems.map((item, index) => (
            <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  height: 40,
                  mx: 1.25,
                  borderRadius: 1,
                  bgcolor: location.pathname === item.path ? '#333' : 'transparent',
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    sx: {
                      color: '#fff',
                      fontWeight: location.pathname === item.path ? 600 : 400,
                      ml: 1.5,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 4, mt: 2 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;