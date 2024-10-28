import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import FoodCard from '../Menu/FoodCard';
import { FoodCategoryProps } from '../../types/types';

const FoodCategory: React.FC<FoodCategoryProps> = ({ category, foodList }) => {
  return (
    <Grid item xs={12} md={4} sx={{ marginBottom: '2rem' }}>
      <Box
        sx={{
          backgroundColor: '#fff',
          borderRadius: '10px',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
          padding: '1rem',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          {category}
        </Typography>
        {foodList.map((food, index) => (
          <FoodCard
            id={food.id}
            key={food.id}
            name={food.name}
            price={food.price}
            description={food.description}
            isOrderingEnabled={food.isOrderingEnabled}
          />
        ))}
      </Box>
    </Grid>
  );
};

export default FoodCategory;
