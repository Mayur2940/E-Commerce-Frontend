import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { axiosGetOrdersByCustId } from '../Service-Components/ServiceOrder';

const Orders = () => {
  const [order, setOrder] = useState([]);
  useEffect(() => {
    getOrder();
  },[])//eslint-disable-line

  const getOrder = async () => {
    let custid = sessionStorage.getItem('id');
    const response = await axiosGetOrdersByCustId(custid);
    console.log(response);
    setOrder(response.data);
  }

  return (
    <div>
    <div className='allOrders-tbl'>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Order ID</b></TableCell>
              <TableCell><b>Order Date</b></TableCell>
              <TableCell><b>Order Status</b></TableCell>
              <TableCell><b>TotalPrice</b></TableCell>
              <TableCell><b>Items</b></TableCell>
              

            </TableRow>
          </TableHead>
          <TableBody>
            {order.map((data) => (
              <TableRow key={data.orderId}>
                <TableCell><b>{data.orderId}</b></TableCell>
                <TableCell><b>{data.date}</b></TableCell>
                <TableCell><b>{data.status}</b></TableCell>
                <TableCell><b>{data.orderedCartDTO.totalPrice}</b></TableCell>
                <TableCell>
                  <Link to={`/orders/${data.orderId}`}><b>See Items</b></Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  </div>
);
};

export default Orders;