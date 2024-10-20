import React, { useContext, useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import { NavbarProps } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';

const Navbar: React.FC<NavbarProps> = ({ itemCount }) => {
  const navigate = useNavigate();
    const { setIsLoggedIn,isLoggedIn} = useContext(AppContext); 
  // Cookie kontrolü ile login durumu belirleniyor
  useEffect(() => {
    const isAuthenticated = document.cookie.includes('FooRestaurantApiAuth');
    setIsLoggedIn(isAuthenticated);
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Menü
        </Typography>

        {isLoggedIn ? (
          // Kullanıcı login olmuşsa sepet, siparişler ve ayarlar ikonları gösterilecek
          <>
            <div onClick={() => navigate('/FilterOrders')}>
              <Button color="inherit">Siparişler</Button>
            </div>

            <div onClick={() => navigate('/cart')}>
              <IconButton color="inherit">
                <Badge badgeContent={itemCount} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </div>

            <IconButton color="inherit" onClick={() => navigate('/settings')}>
              <SettingsIcon />
            </IconButton>
          </>
        ) : (
          // Kullanıcı login olmamışsa Login ve Signup butonları gösterilecek
          <>
            <Button color="inherit" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate('/signup')}>
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
