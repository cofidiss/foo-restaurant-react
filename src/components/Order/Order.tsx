import React, { useContext, useEffect, useState } from 'react';
import {
  Container, Typography, Button, Card, CardContent, Grid, MenuItem, Select, FormControl, InputLabel, TextField
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { CartDto } from '../../types/types';
import { AppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

const Order: React.FC = () => {
  debugger;
  const navigate = useNavigate();
  const [cartDto, setCartDto] = useState<CartDto>({ cartItemDetailDtoList: [], message: '' });
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { startLoading, stopLoading } = useContext(AppContext); // Context'ten loader'ı kontrol etmek için kullanılır

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
    
        stopLoading(); // İşlem tamamlandıktan sonra loading durumunu kapat
      });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Sipariş
        </Typography>
        
        {/* Ödeme Yöntemi Seçimi */}
        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel id="payment-method-label">Ödeme Yöntemi</InputLabel>
          <Select
            labelId="payment-method-label"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            label="Ödeme Yöntemi"
          >
            <MenuItem value="creditCard">Kredi Kartı</MenuItem>
            <MenuItem value="cash">Nakit</MenuItem>
            <MenuItem value="bankTransfer">Banka Havalesi</MenuItem>
          </Select>
        </FormControl>

        {/* Teslimat Tarihi Seçimi */}
        <DateTimePicker
          label="Teslimat Tarihi"
          value={deliveryDate}
          onChange={(newValue) =>  {
            
            debugger;
            
            setDeliveryDate(newValue)}}
        
        />

        {/* Notlar */}
        <TextField
          label="Sipariş Notları"
          multiline
          rows={4}
          value={orderNotes}
          onChange={(e) => setOrderNotes(e.target.value)}
          fullWidth
          style={{ marginBottom: '20px' }}
        />

        <Grid container spacing={2}>
          {cartDto?.cartItemDetailDtoList.length > 0 ? (
            cartDto.cartItemDetailDtoList.map((item) => (
              <Grid item xs={12} key={item.foodId}>
                <Card style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" style={{ margin: '0 15px' }}>
                      {item.quantity}
                    </Typography>
                    <div>
                      <Typography variant="h6">{item.foodName}</Typography>
                      <Typography variant="body2">{item.foodDescription}</Typography>
                      <Typography variant="body2">{item.unitPrice} ₺</Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" align="center" color="textSecondary">
              Sepetiniz boş.
            </Typography>
          )}
        </Grid>

        {/* Siparişi Onayla Butonu */}
        <Button variant="contained" color="success" style={{ marginTop: '20px' }} onClick={handleOrderSubmit}>
          Sipariş Ver
        </Button>
      </Container>
    </LocalizationProvider>
  );
};

export default Order;
