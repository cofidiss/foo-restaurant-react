import React, { useContext } from 'react';
import { Card, CardContent, Typography, CardActions, Button, Box } from '@mui/material';
import { AppContext } from '../contexts/AppContext';
import { FoodCardProps } from '../../types/types';

const FoodCard: React.FC<FoodCardProps> = ({ name, price, description, id, isOrderingEnabled }) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { startLoading, stopLoading, refreshNavbar } = useContext(AppContext);

  const addFoodToCart = () => {
    startLoading();
    fetch(`${baseUrl}/api/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
    })
      .finally(() => {
        refreshNavbar();
        stopLoading();
      });
  };

  return (
    <Card sx={{
      borderRadius: '10px',
      boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease',
      '&:hover': { transform: 'scale(1.03)' },
    }}>
      <CardContent sx={{ textAlign: 'center' }}>
        <img 
          src={`${baseUrl}/images/${name}.jpg`} 
          alt={name} 
          style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '1rem' }} 
        />
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
          {name}
        </Typography>
        <Typography sx={{ fontSize: '1.25rem', color: '#555', marginBottom: '1rem' }}>
          {price} TL
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button
          variant="contained"
          color={isOrderingEnabled ? 'primary' : 'secondary'}
          onClick={addFoodToCart}
          disabled={!isOrderingEnabled}
          sx={{
            padding: '0.5rem 1.5rem',
            borderRadius: '30px',
            background: isOrderingEnabled
              ? 'linear-gradient(to right, #ff6e7f, #bfe9ff)'
              : '#ddd',
            color: '#fff',
            '&:hover': {
              background: isOrderingEnabled
                ? 'linear-gradient(to right, #ff6e7f, #a0e1ff)'
                : '#ccc',
            },
          }}
        >
          {isOrderingEnabled ? 'Add To Basket' : 'Cannot Be Ordered'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default FoodCard;
