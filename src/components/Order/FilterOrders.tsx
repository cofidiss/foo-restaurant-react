import React, { useContext, useEffect, useState } from 'react';
import {
  Container,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Typography,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FilteredOrder, FilterOrderParam } from '../../types/types';
import { AppContext } from '../contexts/AppContext';
import { DateRangePicker ,DateRange, ClearIcon} from '@mui/x-date-pickers-pro';
import { Dayjs } from 'dayjs';
import UpdateOrder from './UpdateOrder';
import CloseIcon from '@mui/icons-material/Close';


const FilterOrders: React.FC = () => {
  debugger;
  const buildQueryString = (filter: FilterOrderParam): string => {
    let query = '';

    // if (filter.pageNumber) {
    //   query += `pageNumber=${filter.pageNumber}&`;
    // }
    // if (filter.pageSize) {
    //   query += `pageSize=${filter.pageSize}&`;
    // }
    if (filter.orderId) {
      query += `orderId=${filter.orderId}&`;
    }
    if (filter.orderDateStart) {
      query += `orderDateStart=${(filter.orderDateStart  as Dayjs).toISOString()}&`;
    }
    if (filter.orderDateEnd) {
      query += `orderDateEnd=${(filter.orderDateEnd as Dayjs).toISOString()}&`;
    }
    if (filter.statusId) {
      query += `statusId=${filter.statusId}&`;
    }
    if (filter.deliveryDateStart) {
      query += `deliveryDateStart=${(filter.deliveryDateStart as Dayjs).toISOString()}&`;
    }
    if (filter.deliveryDateEnd ) {
      query += `deliveryDateEnd=${(filter.deliveryDateEnd as Dayjs).toISOString()}&`;
    }
    if (filter.priceStart) {
      query += `priceStart=${filter.priceStart}&`;
    }
    if (filter.priceEnd) {
      query += `priceEnd=${filter.priceEnd}&`;
    }
    if (filter.address && filter.address.trim()) {
      query += `address=${encodeURIComponent(filter.address)}&`;
    }

    return query.slice(0, -1);
  };
const defaultFilterParam = {
  pageNumber: 1, // Default değer
  pageSize: 5, 
  address:"",
  deliveryDateEnd:null,
  deliveryDateStart:null,
  orderDateEnd:null,
  orderDateStart:null,
  orderId:"",
  priceEnd:"",
  priceStart:"",
  statusId:""  // Default değer
};
  const [filteredOrderList, setFilteredOrderList] = useState<FilteredOrder[]>([]);
  const [filterOrderParam, setFilterOrderParam] = useState<FilterOrderParam>(defaultFilterParam);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { startLoading, stopLoading,setModal1State } = useContext(AppContext);

  const filterOrders = async (filterParams?:FilterOrderParam) => {
    try {
      startLoading();
      const queryString = buildQueryString(filterParams ? filterParams:filterOrderParam);
      const response = await fetch(`${baseUrl}/api/order?${queryString}`);
      if (!response.ok) {
        throw new Error('Error fetching orders.');
      }
      const data: FilteredOrder[] = await response.json();
      setFilteredOrderList(data);
    } catch (error: any) {
      console.error(error);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    filterOrders();
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
    setFilterOrderParam(prevState => ({ ...prevState, pageNumber: newPage + 1 }));
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value, 10);
    setRowsPerPage(newSize);
    setPage(0);
    setFilterOrderParam(prevState => ({ ...prevState, pageSize: newSize, pageNumber: 1 }));
  };

  // Filtreleri temizleme fonksiyonu
  const clearFilters = () => {
    setFilterOrderParam(defaultFilterParam);
    filterOrders(defaultFilterParam);
  };
const onEditClick = (orderId:number)=> {

const modalChildren = (
  <div>
   <Box display="flex" justifyContent="flex-end" marginBottom={2}>
   <Button
      onClick={() => setModal1State({ isOpen: false })}
      sx={{
        width: '40px', // Butonun genişliği
        height: '40px', // Butonun yüksekliği
        backgroundColor: 'red', // Dışarısı kırmızı
        borderRadius: '0%', // Kare görünüm için
        display: 'flex', // İçerikleri ortalamak için
        justifyContent: 'center', // Yatay ortalama
        alignItems: 'center', // Dikey ortalama
        padding: 0, // İç boşlukları kaldırmak için
      }}
    >
      <CloseIcon sx={{ color: 'white' }} /> {/* İçi beyaz çarpı */}
    </Button>
      </Box>

  <UpdateOrder orderId={orderId} filterOrders={filterOrders} />
</div>)

setModal1State({
    isOpen:true,
    children:modalChildren
  })


}
return (
  <Container>
    <Typography variant="h5" align="center" gutterBottom>
      Filter Order
    </Typography>

    {/* Arama Formu */}
    <Grid container spacing={2}>
      {/* İlk satır: Order No, Address, Total Amount Start, Total Amount End */}
      <Grid item xs={6} sm={3}>
        <TextField 
          label="Order No" 
          fullWidth 
          value={filterOrderParam.orderId}
          onChange={(e) => setFilterOrderParam(prevState => ({
            ...prevState,
            orderId: e.target.value ? Number(e.target.value) : "" 
          }))} 
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField 
          label="Address" 
          fullWidth 
          value={filterOrderParam.address}
          onChange={(e) => setFilterOrderParam(prevState => ({ 
            ...prevState, 
            address: e.target.value 
          }))} 
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField 
          label="Total Amount Start" 
          type="number" 
          fullWidth 
          value={filterOrderParam.priceStart}
          onChange={(e) => setFilterOrderParam(prevState => ({
            ...prevState,
            priceStart: e.target.value ? Number(e.target.value) : undefined 
          }))} 
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField 
          label="Total Amount End" 
          type="number" 
          fullWidth 
          value={filterOrderParam.priceEnd}
          onChange={(e) => setFilterOrderParam(prevState => ({
            ...prevState,
            priceEnd: e.target.value ? Number(e.target.value) : undefined 
          }))} 
        />
      </Grid>

      {/* İkinci satır: Teslimat Tarihi ve Oluşturma Tarihi Aralığı */}
      <Grid item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker
            slotProps={{
              actionBar: {
                actions: ['clear']
              },
              fieldSeparator: { sx: { display: "none" } },
            }}
            value={[
              filterOrderParam.deliveryDateStart as Dayjs,
              filterOrderParam.deliveryDateEnd as Dayjs
            ]}
            localeText={{ start: "Delivery Date Start", end: "Delivery Date End" }}
            onChange={(newValue) => {
              setFilterOrderParam(prevState => ({
                ...prevState,
                deliveryDateStart: newValue[0] as Dayjs,
                deliveryDateEnd: newValue[1] as Dayjs,
              }));
            }}
          />
        </LocalizationProvider>
      </Grid>

      <Grid item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker
            localeText={{ start: "Creation Date Start", end: "Creation Date End" }}
            slotProps={{
              actionBar: {
                actions: ['clear']
              },
              fieldSeparator: { sx: { display: "none" } },
            }}
            value={[
              filterOrderParam.orderDateStart as Dayjs,
              filterOrderParam.orderDateEnd as Dayjs
            ]}
            onChange={(newValue) => {
              setFilterOrderParam(prevState => ({
                ...prevState,
                orderDateStart: newValue[0] as Dayjs,
                orderDateEnd: newValue[1] as Dayjs,
              }));
            }}
          />
        </LocalizationProvider>
      </Grid>

      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
          onClick={ ()=>filterOrders()}
          style={{ marginRight: '10px' }}
        >
          Search
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<ClearIcon />}
          onClick={clearFilters}
        >
          Clear Filter
        </Button>
      </Grid>
    </Grid>

    {/* Sipariş Tablosu */}
    <Typography variant="h5" align="center" gutterBottom style={{ marginTop: '20px' }}>
      Orders
    </Typography>
    <TableContainer component={Paper} sx={{ backgroundColor: 'inherit', borderRadius: '8px', boxShadow: 2 }}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Order No</TableCell>
        <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Status</TableCell>
        <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Address</TableCell>
        <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Total Amount</TableCell>
        <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Delivery Date</TableCell>
        <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Creation Date</TableCell>
        <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Action</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {filteredOrderList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order, index) => (
        <TableRow 
          key={order.orderId} 
          sx={{
            '&:hover': {
              backgroundColor: '#f0f0f0', // Hover etkisi
            },
            backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9' // Zebra şeridi
          }}
        >
          <TableCell>{order.orderId}</TableCell>
          <TableCell>{order.statusName}</TableCell>
          <TableCell>{order.address}</TableCell>
          <TableCell>{order.totalPrice} ₺</TableCell>
          <TableCell>{new Date(order.deliveryDate).toLocaleString()}</TableCell>
          <TableCell>{new Date(order.orderDate).toLocaleString()}</TableCell>
          <TableCell>
            <IconButton aria-label="edit" onClick={() => onEditClick(order.orderId)}>
              <EditIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={filteredOrderList.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
    />
  </Container>
);

};

export default FilterOrders;
