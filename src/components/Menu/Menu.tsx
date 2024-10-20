import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import DaySelector from '../../components/Menu/DaySelector';
import FoodCategory from '../../components/Menu/FoodCategory';
import { Container, Typography, Grid2 } from '@mui/material';
import { enDays } from '../constants/enum';
import { AppContext } from '../contexts/AppContext';
import { FoodCategoryData } from '../../types/types';



const Menu: React.FC = () => {

  const { startLoading, stopLoading ,setModal1State} = useContext(AppContext);
  const [selectedDay, setSelectedDay] = useState<enDays>(enDays.Pazartesi);
  const [foodCategories, setFoodCategories] = useState<FoodCategoryData[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const baseUrl = process.env.REACT_APP_BASE_URL;

  const fetchData = async () => {
    try {
      debugger;
      startLoading();
      const response = await fetch(`${baseUrl}/api/food/weekday/${selectedDay}`);
      if (!response.ok) {
        throw new Error('Error fetching food data.');
      }
      const data: FoodCategoryData[] = await response.json();
      setFoodCategories(data);
    } catch (error: any) {
      setErrorMessage(error.message);
      setModal1State({isOpen:true,message:error.message,okButtonText:"Tamam",okButtonClick:()=>setModal1State({isOpen:false}) })
    } finally {
      debugger;
      stopLoading();
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDay]);



  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>

      <Container
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Yemek Menüsü
        </Typography>
        <DaySelector selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        <Typography variant="h5" align="center" gutterBottom>
          {selectedDay}
        </Typography>
        <Grid2
          container
          spacing={2}
          sx={{
            flex: 1,
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {foodCategories.map((category, index) => (
            <FoodCategory 
              key={index} 
              category={category.categoryName} 
              foodList={category.foodList} 
            />
          ))}
        </Grid2>
      </Container>     
    </div>
  );
};

export default Menu;
