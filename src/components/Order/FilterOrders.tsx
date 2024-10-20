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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FilteredOrder, FilterOrderParam } from '../../types/types';
import { AppContext } from '../contexts/AppContext';
import { DateRangePicker ,DateRange} from '@mui/x-date-pickers-pro';
import { Dayjs } from 'dayjs';
import UpdateOrder from './UpdateOrder';



const FilterOrders: React.FC = () => {
  debugger;
  const buildQueryString = (filter: FilterOrderParam): string => {
    let query = '';

    if (filter.pageNumber) {
      query += `pageNumber=${filter.pageNumber}&`;
    }
    if (filter.pageSize) {
      query += `pageSize=${filter.pageSize}&`;
    }
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

  const filterOrders = async () => {
    try {
      startLoading();
      const queryString = buildQueryString(filterOrderParam);
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
  };
const onEditClick = (orderId:number)=> {

const modalChildren = (
  <div>
<Button onClick={()=> setModal1State({isOpen:false})}>close</Button>

  <UpdateOrder orderId={orderId} filterOrders={filterOrders}/>  </div>)

setModal1State({
    isOpen:true,
    children:modalChildren
  })


}
  return (
    <Container>
      <Typography variant="h5" align="center" gutterBottom>
        Sipariş Arama
      </Typography>

      {/* Arama Formu */}
      <Grid container spacing={2}>
        <Grid item xs={6} sm={4}>
          <TextField 
            label="Sipariş No" 
            fullWidth 
            value={filterOrderParam.orderId}
            onChange={(e) => setFilterOrderParam(prevState => ({
              ...prevState,
              orderId: e.target.value ? Number(e.target.value) : "" 
            }))} 
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TextField 
            label="Adres" 
            fullWidth 
            value={filterOrderParam.address}
            onChange={(e) => setFilterOrderParam(prevState => ({ 
              ...prevState, 
              address: e.target.value 
            }))} 
          />
        </Grid>

        {/* Tutar Başlangıç ve Bitiş için görsel düzenleme */}
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField 
                label="Tutar Başlangıç" 
                type="number" 
                fullWidth 
                value={filterOrderParam.priceStart}
                onChange={(e) => setFilterOrderParam(prevState => ({
                  ...prevState,
                  priceStart: e.target.value ? Number(e.target.value) : undefined 
                }))} 
              />
            </Grid>
            <Grid item xs={6}>
              <TextField 
                label="Tutar Bitiş" 
                type="number" 
                fullWidth 
                value={filterOrderParam.priceEnd}
                onChange={(e) => setFilterOrderParam(prevState => ({
                  ...prevState,
                  priceEnd: e.target.value ? Number(e.target.value) : undefined 
                }))} 
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Teslimat Tarihi Aralığı */}
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              slotProps={{
                actionBar: {
                  actions: ['clear']
                }
              }}
              value={[filterOrderParam.deliveryDateStart as Dayjs
                ,filterOrderParam.deliveryDateEnd  as Dayjs
              ]}
              localeText={{ start: "Teslimat Tarihi Başlangıç", end: "Teslimat Tarihi Bitiş"}}         
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

        {/* Oluşturma Tarihi Aralığı */}
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              localeText={{ start: "Oluşturma Tarihi Başlangıç", end: "Oluşturma Tarihi Bitiş"}}    
              slotProps={{
                actionBar: {
                  actions: ['clear']
                }
              }}
              value={[filterOrderParam.orderDateStart as Dayjs
                ,filterOrderParam.orderDateEnd  as Dayjs
              ]}
              onChange={(newValue) => {
                setFilterOrderParam(prevState => ({
                  ...prevState,
                  orderDateStart:newValue[0] as Dayjs,
                  orderDateEnd: newValue[1] as Dayjs,
                }));
              }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" startIcon={<SearchIcon />} onClick={filterOrders} style={{ marginRight: '10px' }}>
            Ara
          </Button>
          <Button variant="outlined" color="secondary" onClick={clearFilters}>
            Filtreleri Temizle
          </Button>
        </Grid>
      </Grid>

      {/* Sipariş Tablosu */}
      <Typography variant="h5" align="center" gutterBottom style={{ marginTop: '20px' }}>
        Siparişler
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sipariş No</TableCell>
              <TableCell>Statü</TableCell>
              <TableCell>Adres</TableCell>
              <TableCell>Tutar</TableCell>
              <TableCell>Teslimat Tarihi</TableCell>
              <TableCell>Oluşturma Tarihi</TableCell>
              <TableCell>Aksiyon</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrderList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
              <TableRow key={order.orderId}>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{order.statusName}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>{order.totalPrice} ₺</TableCell>
                <TableCell>{new Date(order.deliveryDate).toLocaleString()}</TableCell>
                <TableCell>{new Date(order.orderDate).toLocaleString()}</TableCell>
                <TableCell>
                  <IconButton aria-label="edit" onClick={(e)=>onEditClick(order.orderId)}>
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
