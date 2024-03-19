import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { axiosAddToCart, axiosDeleteProductCart } from '../Service-Components/ServiceCart';
import { axiosGetCart } from '../Service-Components/ServiceUser';
import { axiosPlaceOrder } from '../Service-Components/ServiceOrder';
import DisplayImageCust from './DisplayImageCust';

// Define CSS styles for the dialog
const dialogStyles = {
  dialogTitle: {
    backgroundColor: 'purple',
    color: 'white',
  },
  dialogContent: {
    padding: '20px',
  },
  dialogActions: {
    padding: '10px 20px',
  },
  dialogButton: {
    backgroundColor: 'purple',
    color: 'white',
    '&:hover': {
      backgroundColor: 'white',
      color: 'purple',
    },
  },
};

const DisplayCart = () => {
  const history = useHistory();
  const [cart, setCart] = useState({});
  const [cart1, setCart1] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [openCODDialog, setOpenCODDialog] = useState(false);

  useEffect(() => {
    getCarts();
  }, []);

  useEffect(() => {
    if (openDialog) {
      const timer = setTimeout(() => {
        history.push('/viewproducts');
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [openDialog, history]);

  const getCarts = async () => {
    let custid = sessionStorage.getItem('id');
    const response = await axiosGetCart(custid);
    setCart(response.data.cartItems);
    setCart1(response.data);
  }

  const addToCart = async (id) => {
    let custid = sessionStorage.getItem('id');
    await axiosAddToCart(custid, id);
    getCarts();
    history.push('/cart');
  }

  const deleteProductCart = async (id) => {
    let custid = sessionStorage.getItem('id');
    await axiosDeleteProductCart(custid, id);
    getCarts();
    history.push('/cart');
  }

  const placeOrder = async () => {
    console.log("Placing order...");
    let custid = sessionStorage.getItem('id');
    await axiosPlaceOrder(custid);
    setOpenPaymentDialog(true);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
    history.push('/viewproducts');
  }

  const handleClosePaymentDialog = () => {
    setOpenPaymentDialog(false);
    setOpenCODDialog(true);
  }

  const handleCloseCODDialog = () => {
    setOpenCODDialog(false);
    setOpenDialog(true);
  }

  const handlePaymentComplete = async () => {
    console.log("Payment completed successfully.");
    handleClosePaymentDialog();
  }

  const handleCancelPayment = () => {
    handleClosePaymentDialog();
    setOpenDialog(false);
  }

  const handleConfirmCOD = async () => {
    console.log("Order placed successfully via Cash on Delivery.");
    handleCloseCODDialog();
  }

  return (
    <div style={{ overflowX: 'hidden' }}>
      <div className="total-display">
        <b>
          <h1>Total Price: {cart1.totalPrice}/-</h1>
        </b>
      </div>

      <Container>
        <Grid container spacing={3}>
          {Array.isArray(cart) && cart.length > 0 ? (
            cart.map((cartitem) => (
              cartitem.quantity > 0 &&
              <Grid item key={cartitem.product.productId} xs={12} sm={6} md={4} lg={3}>
                <Card>
                  <div className="image-container">
                    <div className="image-wrapper">
                      <DisplayImageCust image={cartitem.product.productImage} />
                      <div className="hover-effect"></div>
                    </div>
                  </div>
                  <CardContent>
                    <Typography variant="h6">{cartitem.product.productName}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Price: {cartitem.product.productPrice}
                    </Typography>
                  </CardContent>
                  <Button
                    className="inc"
                    onClick={() => addToCart(cartitem.product.productId)}
                    variant="contained"
                    style={{ backgroundColor: 'blue', color: 'white' }}
                    size="small"
                  >
                    <strong>+</strong>
                  </Button>
                  <b className="quanty">{cartitem.quantity}</b>
                  <Button
                    className="dec"
                    onClick={() => deleteProductCart(cartitem.product.productId)}
                    variant="contained"
                    style={{ backgroundColor: 'red', color: 'white' }}
                    size="small"
                  >
                    <strong>-</strong>
                  </Button>
                </Card>
              </Grid>
            ))
          ) : (
            <div className="cart-em" style={{ marginBottom: '20px' }}>
              <h1>Your cart is empty.</h1>
            </div>
          )}
        </Grid>
      </Container>

      {cart1.totalPrice > 0 && (
        <Button
          onClick={() => placeOrder()}
          variant="contained"
          color="primary"
          size="small"
          className="place"
          style={{
            marginTop: '20px',
            alignItems: 'center',
            backgroundColor: 'purple',
            color: 'white',
            padding: '12px 24px',
            fontSize: '1.0rem',
            '&:hover': {
              backgroundColor: 'white',
              color: 'lightblue',
            },
          }}
        >
          <strong>Place Order</strong>
        </Button>
      )}

      {/* Payment Dialog */}
      <Dialog
        open={openPaymentDialog}
        onClose={handleClosePaymentDialog}
        aria-labelledby="payment-dialog-title"
        PaperProps={{
          sx: {
            '& .MuiDialog-paper': {
              width: '400px',
            },
          },
        }}
      >
        <DialogTitle id="payment-dialog-title">Make Payment</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Please proceed to make the payment.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelPayment} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePaymentComplete} color="primary" autoFocus>
            Complete Payment
          </Button>
        </DialogActions>
      </Dialog>

      {/* COD Confirmation Dialog */}
      <Dialog
        open={openCODDialog}
        onClose={handleCloseCODDialog}
        PaperProps={{
          sx: {
            '& .MuiDialog-paper': {
              width: '400px',
            },
          },
        }}
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Your order will be placed via Cash on Delivery. Are you sure?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCODDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmCOD} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Order Placed Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            '&.MuiDialog-root': {
              animation: 'fade-in 0.5s ease-in-out',
            },
            ...dialogStyles,
          },
        }}
      >
        <DialogTitle sx={dialogStyles.dialogTitle}>Congratulations!</DialogTitle>
        <DialogContent sx={dialogStyles.dialogContent}>
          <Typography variant="body1">Your order has been placed successfully.</Typography>
        </DialogContent>
        <DialogActions sx={dialogStyles.dialogActions}>
          <Button onClick={handleCloseDialog} color="primary" sx={dialogStyles.dialogButton}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DisplayCart;
