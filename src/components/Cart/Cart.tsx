import React, { useContext, useEffect, useState } from 'react';
import { Container, Typography, Button, Card, CardContent, IconButton, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CartDto } from '../../types/types';
import { AppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';


const Cart: React.FC = () => {
    const navigate = useNavigate();
  const [cartDto, setCartDto] = useState<CartDto>({ cartItemDetailDtoList: [], message: '' });
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { startLoading, stopLoading,refreshNavbar,globalCss } = useContext(AppContext); // Context'ten loader'ı kontrol etmek için kullanılır

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = () => {
    startLoading(); // İşlem başlamadan önce loading durumunu aktif et

    fetch(`${baseUrl}/api/cart`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json().then((x) => setCartDto(x as CartDto));
        } else {
          return response.text().then((x) => {
            console.error('Hata:', x || 'Sepet verileri alınamadı.');
          });
        }
      })
      .catch((error) => {
        console.error('Hata:', error);
      })
      .finally(() => {
        stopLoading(); // İşlem tamamlandıktan sonra loading durumunu kapat
      });
  };

  const handleRemove = (foodId: number) => {
    startLoading(); // İşlem başlamadan önce loading durumunu aktif et

    fetch(`${baseUrl}/api/cart/${foodId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          // API'den silme işlemi başarılı olursa sepeti güncellemek için tekrar sepet verilerini çek

        } else {
          return response.text().then((x) => {
            console.error('Silme hatası:', x || 'Ürün silinemedi.');
          });
        }
      })
      .catch((error) => {
        console.error('Silme hatası:', error);
      })
      .finally(() => {
        getCartItems();
        refreshNavbar();
        stopLoading(); // İşlem tamamlandıktan sonra loading durumunu kapat
      });
  };

  return (
    <Container       sx={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Typography variant="h4" align="center" gutterBottom>
        Cart
      </Typography>

      <Grid container spacing={2}>
        {cartDto?.cartItemDetailDtoList.length > 0 ? (
          cartDto.cartItemDetailDtoList.map((item) => (
            <Grid item xs={12} key={item.foodId}>
              <Card style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton onClick={() => handleRemove(item.foodId)} color="error">
                    <DeleteIcon />
                  </IconButton>
                  <Typography variant="h6" style={{ margin: '0 15px' }}>
                    {item.quantity} <CloseIcon/>
                  </Typography>
                  <div>
                    <Typography variant="h6">{item.foodName}</Typography>
                    <Typography variant="body2">{item.foodDescription}</Typography>
                    <Typography variant="body2">{item.unitPrice * item.quantity} ₺</Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
          <Typography variant="body1" align="center" color="textSecondary">
            Cart Is Empty
          </Typography>
        </Grid>
        )}
      </Grid>
      <Button disabled={!(cartDto?.cartItemDetailDtoList.length > 0)} variant="contained" color="error" style={{ marginTop: '20px' }} onClick={()=> navigate("/order")}>
        Confirm Basket
      </Button>
    </Container>
  );
};

export default Cart;
