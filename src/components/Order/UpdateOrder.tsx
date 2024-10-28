import React, { useContext, useEffect, useState } from 'react';
import { Container, Grid, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, Box } from '@mui/material';
import { useParams } from 'react-router-dom'; // React Router'dan ID'yi almak için
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs'; // Tarih formatlaması için
import { OrderDetail, UpdateOrderProps, StatusLov } from '../../types/types';
import { AppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

const UpdateOrder: React.FC<UpdateOrderProps> = ({orderId,filterOrders}) => {
const navigate = useNavigate();
  const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);
  const [statusLov , setStatusLov] = useState<StatusLov[]>([]); // Statülerin listesi
  const [selectedStatus, setSelectedStatus] = useState< string>(''); // Seçili statü
  const { startLoading, stopLoading ,setModal2State,setModal1State} = useContext(AppContext);
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
title:"Update Is Succesfull",
okButtonText:"Ok",
okButtonClick:()=> {
  filterOrders();
  setModal2State({isOpen:false});
  setModal1State({isOpen:false});
},
          
        })
      }
      else {
   let errorText =     await response.text();
        setModal2State({
          isOpen:true,
          title:errorText,
          okButtonText:"Ok",
          okButtonClick:() => {
          
            setModal2State({isOpen:false});
          },
                    

      });

    }
  
  } 
     catch (error) {
      setModal2State({
        isOpen:true,
        title:"Unknown Error Occured",
        okButtonText:"Ok",
        okButtonClick:() => {
        
          setModal2State({isOpen:false});
        },
                  

    });
      console.error('Hata:', error);
    } finally {
 
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
      <Typography variant="h4" gutterBottom  align="center">
        Update Order
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Order No"
            value={orderDetail?.orderNo}
            fullWidth
            InputProps={{ readOnly: true }}
            InputLabelProps={{ shrink: true }} // Etiketi yukarıda tutmak için
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Total Amount"
            value={`${orderDetail?.totalPrice} ₺`}
            fullWidth
            InputProps={{ readOnly: true }}
            InputLabelProps={{ shrink: true }} // Etiketi yukarıda tutmak için
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Adress"
            value={orderDetail?.address}
            fullWidth
            InputProps={{ readOnly: true }}
            InputLabelProps={{ shrink: true }} // Etiketi yukarıda tutmak için
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TextField
              label="Creation Date"
              value={dayjs(orderDetail?.orderDate).format('DD.MM.YYYY HH:mm')}
              fullWidth
              InputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }} // Etiketi yukarıda tutmak için
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TextField
              label="Delivery Date"
              value={dayjs(orderDetail?.deliveryDate).format('DD.MM.YYYY HH:mm')}
              fullWidth
              InputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }} // Etiketi yukarıda tutmak için
            />
          </LocalizationProvider>
        </Grid>

        {/* Statü alanı */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel  id="status-select-label">Status</InputLabel>
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
        <Box display="flex" justifyContent="flex-end" marginBottom={2}>
          <Button variant="contained" color="success" onClick= {()=> updateOrderStatus()}>
            Save
          </Button ></Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UpdateOrder;
