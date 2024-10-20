import React from 'react';
import { Grid, Typography } from '@mui/material';
import FoodCard from '../Menu/FoodCard';
import { FoodCategoryProps } from '../../types/types';


const FoodCategory: React.FC<FoodCategoryProps> = ({ category, foodList }) => {
  return (
    <Grid item xs={12} md={3}>
      <Typography variant="h6" align="center" gutterBottom>
        {category}
      </Typography>
      {/* Yemek kartlarını dinamik olarak render et */}
      {foodList.map((food, index) => (
        <FoodCard 
          id={food.id}
          key={food.id}
          name={food.name} 
          price={food.price} 
          description={food.description} 
          isOrderingEnabled= {food.isOrderingEnabled}
        />
      ))}
    </Grid>
  );
};

export default FoodCategory;
