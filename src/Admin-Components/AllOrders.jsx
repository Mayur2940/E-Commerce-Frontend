import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Button, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { axiosGetAllOrders, updateOrderStatus } from '../Service-Components/ServiceOrder';

const PAGE_SIZE = 5; // Number of orders per page
const MAX_PAGES_DISPLAYED = 3; // Maximum number of pagination buttons displayed

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    getOrders();
  }, [currentPage]);

  const getOrders = async () => {
    try {
      const response = await axiosGetAllOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const formatOrderDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day}/Time- ${hours}:${minutes}`;
  };

  const handleAccept = async (orderId) => {
    try {
      await updateOrderStatus(orderId);
      setOrders(prevOrders => prevOrders.map(order => {
        if (order.orderId === orderId) {
          return { ...order, status: 'Accepted' };
        }
        return order;
      }));
      console.log('Order status updated successfully');
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  const totalPages = Math.ceil(orders.length / PAGE_SIZE);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const halfMaxPages = Math.floor(MAX_PAGES_DISPLAYED / 2);
    const firstPage = Math.max(1, currentPage - halfMaxPages);
    const lastPage = Math.min(totalPages, firstPage + MAX_PAGES_DISPLAYED - 1);
    return Array.from({ length: lastPage - firstPage + 1 }, (_, index) => index + firstPage);
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, orders.length);
  const currentPageOrders = orders.slice(startIndex, endIndex);

  const handleSortBy = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const sortByDate = () => {
    const sortedOrders = [...orders].sort((a, b) => new Date(a.date) - new Date(b.date));
    setOrders(sortedOrders);
    setAnchorEl(null);
  };

  const sortByMonth = () => {
    const sortedOrders = [...orders].sort((a, b) => new Date(a.date).getMonth() - new Date(b.date).getMonth());
    setOrders(sortedOrders);
    setAnchorEl(null);
  };

  return (
    <div className='allOrders-container'>
      <div className='sort-buttons' style={{paddingLeft: '22px'}}>
      <Button
      variant="outlined"
      onClick={handleSortBy}
      style={{ backgroundColor: '#f0f0f0', color: '#333' , paddingLeft: '10px', marginTop: '10px' }} // Change background color and text color
      >
     Sort By
  </Button>
  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleCloseMenu}
  >
    <MenuItem onClick={sortByDate} style={{ backgroundColor: '#f0f0f0', color: '#333' }}>Date</MenuItem> {/* Change background color and text color */}
    <MenuItem onClick={sortByMonth} style={{ backgroundColor: '#f0f0f0', color: '#333' }}>Month</MenuItem> {/* Change background color and text color */}
  </Menu>
</div>

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
              {currentPageOrders.map((order) => (
                <TableRow key={order.orderId}>
                  <TableCell><b>{order.orderId}</b></TableCell>
                  <TableCell><b>{formatOrderDate(order.date)}</b></TableCell>
                  <TableCell><b>{order.status}</b></TableCell>
                  <TableCell><b>{order.orderedCartDTO ? (order.orderedCartDTO.totalPrice !== undefined ? order.orderedCartDTO.totalPrice : 'N/A') : 'N/A'}</b></TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    <Link to={`/orders/${order.orderId}`} style={{ display: 'block' }}><b>See Items</b></Link>
                  </TableCell>
                  <TableCell><b>{order.orderedCartDTO && order.orderedCartDTO.customer ? order.orderedCartDTO.customer.id : 'N/A'}</b></TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: order.status === 'Accepted' ? 'grey' : 'green', color: 'white' }}
                      onClick={() => handleAccept(order.orderId)}
                      disabled={order.status === 'Accepted'}
                    >
                      Accept
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className='pagination'>
        <Button
          disabled={currentPage === 1}
          onClick={goToPreviousPage}
          variant="outlined"
          style={{ margin: '5px' }}
        >
          Previous
        </Button>
        {getPageNumbers().map((page) => (
          <Button
            key={page}
            onClick={() => goToPage(page)}
            variant="outlined"
            style={{ margin: '5px', backgroundColor: currentPage === page ? 'blue' : 'lightblue', color: currentPage === page ? 'white' : 'black' }}
          >
            {page}
          </Button>
        ))}
        <Button
          disabled={currentPage === totalPages}
          onClick={goToNextPage}
          variant="outlined"
          style={{ margin: '5px' }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default AllOrders;
