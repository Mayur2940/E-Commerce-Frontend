import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { axiosGetAllOrders, updateOrderStatus } from '../Service-Components/ServiceOrder';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const response = await axiosGetAllOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleAccept = async (orderId) => {
    try {
      await updateOrderStatus(orderId); // Call the service method to update the order status
      // Update the order status in the local state
      setOrders(prevOrders => prevOrders.map(order => {
        if (order.orderId === orderId) {
          return { ...order, status: 'Accepted' }; // Assuming the status is updated to 'Accepted'
        }
        return order;
      }));
      console.log('Order status updated successfully');
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

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
                <TableCell><b>Total Price</b></TableCell>
                <TableCell><b>Items</b></TableCell>
                <TableCell><b>Customer ID</b></TableCell>
                <TableCell><b>Order Acceptance</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.orderId}>
                  <TableCell><b>{order.orderId}</b></TableCell>
                  <TableCell><b>{order.date}</b></TableCell>
                  <TableCell><b>{order.status}</b></TableCell>
                  <TableCell><b>{order.orderedCartDTO.totalPrice}</b></TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    <Link to={`/orders/${order.orderId}`} style={{ display: 'block' }}><b>See Items</b></Link>
                  </TableCell>
                  <TableCell><b>{order.orderedCartDTO.customer.id}</b></TableCell>
                  <TableCell>
                    <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} onClick={() => handleAccept(order.orderId)}>Accept</Button>
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

export default AllOrders;
