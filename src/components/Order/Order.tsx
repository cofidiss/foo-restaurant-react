import React, { useContext, useEffect, useState } from 'react';
import {
  Container, Typography, Button, Card, CardContent, Grid, MenuItem, Select, FormControl, InputLabel, TextField,
  Box
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { CartDto } from '../../types/types';
import { AppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const Order: React.FC = () => {
  debugger;
  const navigate = useNavigate();
  const [cartDto, setCartDto] = useState<CartDto>({ cartItemDetailDtoList: [], message: '' });
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { startLoading, stopLoading,refreshNavbar } = useContext(AppContext); // Context'ten loader'ı kontrol etmek için kullanılır

  // Ekstra state'ler:
  const [paymentMethod, setPaymentMethod] = useState<string>('creditCard');
  const [deliveryDate, setDeliveryDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [orderNotes, setOrderNotes] = useState<string>('');

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

  const handleOrderSubmit = () => {
   
    fetch(`${baseUrl}/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "ordersNote": orderNotes,
        "deliveryDate": deliveryDate,
        "paymentMethod": paymentMethod
      }),
    })
      .then((response) => {
        if(response.ok){
          navigate("/filterOrders");
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
    <Container
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {cartDto?.cartItemDetailDtoList.length > 0 ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Container>
            <Typography variant="h4" align="center" gutterBottom>
              Order
            </Typography>
  
            {/* Üstteki üç form elemanını aynı satıra yerleştirmek için Grid kullanıyoruz */}
            <Grid container spacing={2} style={{ marginBottom: '40px' }}>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="payment-method-label">Payment Method</InputLabel>
                  <Select
                    labelId="payment-method-label"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    label="Payment Method"
                  >
                    <MenuItem value="creditCard">Credit Card</MenuItem>
                    <MenuItem value="cash">Cash</MenuItem>
                    <MenuItem value="bankTransfer">EFT</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
  
              <Grid item xs={4}>
              <FormControl fullWidth>
                <DateTimePicker
                  label="Delivery Date"
                  value={deliveryDate}
                  onChange={(newValue) => {
                    setDeliveryDate(newValue);
                  }}
                
                />
              </FormControl>
              </Grid>
  
              <Grid item xs={4}>
                <TextField
                  label="Order Notes"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
  
            {/* Sepet öğeleri */}
            <Grid container spacing={2}>
              {cartDto.cartItemDetailDtoList.map((item) => (
                <Grid item xs={12} key={item.foodId}>
                  <Card style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="h6" style={{ margin: '0 15px' }}>
                        {item.quantity} <CloseIcon />
                      </Typography>
                      <div>
                        <Typography variant="h6">{item.foodName}</Typography>
                        <Typography variant="body2">{item.foodDescription}</Typography>
                        <Typography variant="body2">{item.unitPrice} ₺</Typography>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
  
            {/* Siparişi Onayla Butonu */}
            <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
              <Button variant="contained" color="success" onClick={handleOrderSubmit}>
                Order
              </Button>
            </Grid>
          </Container>
        </LocalizationProvider>
      ) : (
        <Typography variant="body1" align="center" color="textSecondary">
          Cart Is Empty.
        </Typography>
      )}
    </Container>
  );
  
}
export default Order;
