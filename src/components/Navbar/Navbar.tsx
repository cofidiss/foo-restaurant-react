import React, { useContext, useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Badge, Menu, MenuItem } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login'; // Import Login icon
import PersonAddIcon from '@mui/icons-material/PersonAdd'; // Import Signup icon
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Profile icon
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Logout icon
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'; // Import Restaurant Menu icon
import { NavbarProps } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';

const Navbar: React.FC<NavbarProps> = ({ itemCount }) => {
  const navigate = useNavigate();
  const { setIsLoggedIn ,isLoggedIn} = useContext(AppContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Cookie kontrolü ile login durumu belirleniyor
  useEffect(() => {
    const isAuthenticated = document.cookie.includes('FooRestaurantApiAuth');
    setIsLoggedIn(isAuthenticated);
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    handleMenuClose();
  };
debugger;
  const handleLogoutClick = () => {

    setIsLoggedIn(false);
    navigate('/login');
    handleMenuClose();
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'rgba(241, 78, 78, 0.8)' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Button 
            color="inherit" 
            onClick={() => navigate('/menu')} 
            startIcon={<RestaurantMenuIcon />} // Use Restaurant Menu icon
            sx={{
              '&:hover': {
                border: '2px solid white', // White border on hover
                borderRadius: '4px', // Optional: give it rounded corners
                transform: 'scale(1.05)', // Slightly increase size on hover
              },
            }}
          >
            Menu
          </Button>
        </Typography>

        {isLoggedIn ? (
          <>
            <div onClick={() => navigate('/FilterOrders')}>
              <Button 
                color="inherit" 
                sx={{
                  '&:hover': {
                    border: '2px solid white', // White border on hover
                    borderRadius: '4px', // Optional: give it rounded corners
                    transform: 'scale(1.05)', // Slightly increase size on hover
                  },
                }}
              >
                Orders
              </Button>
            </div>

            <div onClick={() => navigate('/cart')}>
              <IconButton color="inherit"      sx={{
                  '&:hover': {
                    border: '2px solid white', // White border on hover
                    borderRadius: '4px', // Optional: give it rounded corners
                    transform: 'scale(1.05)', // Slightly increase size on hover
                  },
                }} >
                <Badge badgeContent={itemCount} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </div>

            {/* Settings Icon with Dropdown Menu */}
            <div
              onMouseEnter={handleMenuOpen} // Open on hover
              onMouseLeave={handleMenuClose} // Close when mouse leaves
            >
              <IconButton color="inherit" sx={anchorEl && {
    border: '2px solid white', // White border
    borderRadius: '4px', // Rounded corners
    transform: 'scale(1.05)', // Increased size
    transition: 'transform 0.3s ease, border 0.3s ease', // Smooth transition for border and transform
  }}>
                <SettingsIcon />
              </IconButton>
              <Menu
                id="settings-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                MenuListProps={{
                  onMouseLeave: handleMenuClose, // Close when mouse leaves the menu
                }}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    borderRadius: '10px',
                    padding: '5px 0',
                    minWidth: '150px',
                    '& .MuiMenuItem-root': {
                      display: 'flex', // Align icons and text
                      alignItems: 'center', // Center items vertically
                      padding: '10px 20px',
                      '&:hover': {
                        backgroundColor: '#1976d2', // Change background on hover
                        color: 'white', // Change text color on hover
                        transition: 'background-color 0.3s ease', // Smooth transition effect
                      },
                    },
                  },
                }}
              >
                <MenuItem onClick={handleProfileClick}>
                  <AccountCircleIcon sx={{ marginRight: '10px' }} /> Profile
                </MenuItem>
                <MenuItem onClick={handleLogoutClick}>
                  <ExitToAppIcon sx={{ marginRight: '10px' }} /> Log Out
                </MenuItem>
              </Menu>
            </div>
          </>
        ) : (
          <>
            <Button 
              color="inherit" 
              onClick={() => navigate('/login')} 
              startIcon={<LoginIcon />}
              sx={{
                '&:hover': {
                  border: '2px solid white', // White border on hover
                  borderRadius: '4px', // Optional: give it rounded corners
                  transform: 'scale(1.05)', // Slightly increase size on hover
                },
              }}
            >
              Login
            </Button>
            <Button 
              color="inherit" 
              onClick={() => navigate('/signup')} 
              startIcon={<PersonAddIcon />}
              sx={{
                '&:hover': {
                  border: '2px solid white', // White border on hover
                  borderRadius: '4px', // Optional: give it rounded corners
                  transform: 'scale(1.05)', // Slightly increase size on hover
                },
              }}
            >
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
