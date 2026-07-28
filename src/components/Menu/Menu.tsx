import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import DaySelector from '../../components/Menu/DaySelector';
import FoodCategory from '../../components/Menu/FoodCategory';
import { Container, Typography, Box, Grid } from '@mui/material';
import { enDays } from '../constants/enum';
import { AppContext } from '../contexts/AppContext';
import { FoodCategoryData } from '../../types/types';
import { useNavigate } from 'react-router-dom';

const Menu: React.FC = () => {
  const { startLoading, stopLoading, setModal1State ,isLoggedIn} = useContext(AppContext);
  const [selectedDay, setSelectedDay] = useState<enDays>(0);
  const [foodCategories, setFoodCategories] = useState<FoodCategoryData[]>([]);
  const navigate = useNavigate();

  const baseUrl = process.env.REACT_APP_BASE_URL;

  const fetchData = async () => {
    try {
      startLoading();
      const response = await fetch(`${baseUrl}/api/food/weekday/${selectedDay}`);
      if (!response.ok) {
        throw new Error('Error fetching food data.');
      }
      const data: FoodCategoryData[] = await response.json();
      setFoodCategories(data);
    } catch (error: any) {

      setModal1State({
        isOpen: true,
        message: "There was a server error.",
        okButtonText: "Ok",
        okButtonClick: () => setModal1State({ isOpen: false }),
      });
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDay]);
  useEffect(() => {
    if (!isLoggedIn) {
    navigate('/login');
    }
  }, []);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>



      <Container
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'  

        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ marginBottom: '1rem' }}>
          Weekly Menu
        </Typography>

        <Box sx={{ marginBottom: '1rem', width: '100%' }}>
          {/* Gün seçici bileşen */}
          <DaySelector selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        </Box>

        <Typography variant="h5" align="center" gutterBottom sx={{ marginBottom: '2rem' }}>
  
        </Typography>

        <Grid
          container
          spacing={2}
          sx={{
            flex: 1,
            width: '100%',
            justifyContent: 'center',
          }}
        >
          {foodCategories.length > 0 ? (
            foodCategories.map((category, index) => (
              <FoodCategory key={index} category={category.categoryName} foodList={category.foodList} />
            ))
          ) : (
            <Typography variant="body1" color="textSecondary">
             There is no menu for the day.
            </Typography>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default Menu;
