import React ,{useContext} from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { AppContext } from '../contexts/AppContext';
import { useNavigate } from "react-router-dom";
import { FoodCardProps } from '../../types/types';

const FoodCard: React.FC<FoodCardProps> = ({ name, price, description,id ,isOrderingEnabled}) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { startLoading, stopLoading ,refreshNavbar} = useContext(AppContext); // Context'ten loader'ı kontrol etmek için kullanılır

  const addFoodToCart = () => {
    startLoading(); // İşlem başlamadan önce loading durumunu aktif et

    fetch(`${baseUrl}/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    })
      .then((response) => {
        if(response.ok){
              }
      else {
        // response.text().then(x=>     setError(x || "Giriş başarısız"))

      } })      
      .catch((error) => {
        // setError("Sunucuya bağlanırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
      })
      .finally(() => {
        debugger;
        refreshNavbar();
        stopLoading(); // İşlem tamamlandıktan sonra loading durumunu kapat
      });
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography color="textSecondary">{price}</Typography>
        <Typography variant="body2">{description}</Typography>
        <img src={`${baseUrl}/images/${id}.jpg`} alt="Description"></img>
      </CardContent>
      <CardActions>
        {isOrderingEnabled ? ( <Button size="small" color="primary" onClick={addFoodToCart}>Sepete Ekle</Button>) :"Sipariş Verilemez" }
       
      </CardActions>
    </Card>
  );
};

export default FoodCard;
