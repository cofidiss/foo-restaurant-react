import React, { useContext, useEffect, useState } from 'react';
import { Container, Grid, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { useParams } from 'react-router-dom'; // React Router'dan ID'yi almak için
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs'; // Tarih formatlaması için
import { OrderDetail, UpdateOrderProps, StatusLov } from '../../types/types';
import { AppContext } from '../contexts/AppContext';

const UpdateOrder: React.FC<UpdateOrderProps> = ({orderId,filterOrders}) => {

  const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);
  const [statusLov , setStatusLov] = useState<StatusLov[]>([]); // Statülerin listesi
  const [selectedStatus, setSelectedStatus] = useState< string>(''); // Seçili statü
  const { startLoading, stopLoading ,setModal2State} = useContext(AppContext);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const fetchStatuses = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/order/status/list`); // Statüleri çekmek için API isteği
      if (!response.ok) {
        throw new Error('Statü verileri çekilirken hata oluştu');
      }
      const data: StatusLov[] = await response.json();
      setStatusLov(data); // Statü listesini güncelle
    } catch (error) {
      console.error('Hata:', error);
    }
  };
  const fetchOrderData = async () => {
    try {
      startLoading();
      const response = await fetch(`${baseUrl}/api/order/detail/${orderId}`);
      if (!response.ok) {
        throw new Error('Sipariş verileri çekilirken hata oluştu');
      }
      const data: OrderDetail = await response.json();
      setOrderDetail(data);
      setSelectedStatus(data.statusId); // Statüyü siparişin mevcut statüsü olarak ayarla
    } catch (error) {
      console.error('Hata:', error);
    } finally {
      stopLoading();
    }
  };
  useEffect(() => { 

    fetchOrderData();
          fetchStatuses();
  }, []);

  const updateOrderStatus = async () => {
    try {
      startLoading();

      const response = await fetch(`${baseUrl}/api/order/${orderId}/status`, {
        method: 'PUT', // PUT metodunu belirtiyoruz
        headers: {
          'Content-Type': 'application/json'  
        },
        body:    selectedStatus, // Gönderilecek JSON verisi (örneğin, yeni statü)
        
      });
      if (response.ok) {
        setModal2State({
isOpen:true,
title:"update is succesfull",
okButtonText:"Tamam",
okButtonClick:()=> {

  setModal2State({isOpen:false});
},
          
        })
      }
      else {
   let errorText =     await response.text();
        setModal2State({
          isOpen:true,
          title:errorText,
          okButtonText:"Tamam",
          okButtonClick:() => {
          
            setModal2State({isOpen:false});
          },
                    

      });

    }
  
  } 
     catch (error) {
      console.error('Hata:', error);
    } finally {
      fetchOrderData();
      fetchStatuses();
      stopLoading();
    }
  };
  useEffect(() => { 
    filterOrders();
    fetchOrderData();
          fetchStatuses();
  }, []);


  const handleStatusChange = (event : SelectChangeEvent) => {
    setSelectedStatus(event.target.value ); // Seçilen statüyü güncelle
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Sipariş Güncelleme
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Sipariş No"
            value={orderDetail?.orderNo}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Tutar"
            value={`${orderDetail?.totalPrice} ₺`}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Adres"
            value={orderDetail?.address}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TextField
              label="Oluşturma Tarihi"
              value={dayjs(orderDetail?.orderDate).format('DD.MM.YYYY HH:mm')}
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TextField
              label="Teslimat Tarihi"
              value={dayjs(orderDetail?.deliveryDate).format('DD.MM.YYYY HH:mm')}
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </LocalizationProvider>
        </Grid>

        {/* Statü alanı */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="status-select-label">Statü</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={selectedStatus}
              onChange={handleStatusChange}
            >
              {statusLov.map((status) => (
                <MenuItem key={status.id} value={status.id}>
                  {status.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick= {()=> updateOrderStatus()}>
            Kaydet
          </Button >
        </Grid>
      </Grid>
    </Container>
  );
};

export default UpdateOrder;
