import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, FormControl, InputLabel, Input, Box, FormGroup, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { axiosAddProduct } from '../Service-Components/ServiceProduct';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const myComponent = {
    width: '420px',
    height: '350px',
    overflowX: 'hidden',
    overflowY: 'hidden',
    top: '170px',
    left: '400px',
    // backgroundColor: '#f0f0f0', // Background color for the form
    background: 'linear-gradient(to bottom right,#e6f7ff, #c2e0f0)', // Linear gradient background
    borderRadius: '20px', // Border radius for the form
    padding: '10px', // Padding for the form
};

const formControlStyle = {
    marginBottom: '10px', // Adjust the margin as per your requirement
};

const labelStyle = {
    marginBottom: '8px', // Add bottom margin to the label
};

toast.configure();

const AddProduct = () => {
    const [product, setProduct] = useState({
        productName: '',
        productPrice: 0,
        brand: '',
        productImage: '',
        category: null,
    });
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const history = useHistory();

    const onValueInput = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    }

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
        setProduct({ ...product, category: category });
        setOpenDialog(false);
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!/[0-9]/.test(product.productPrice)) {
            newErrors.productPrice = 'Must be a number';
            valid = false;
        }
        if (product.productName.length < 2) {
            newErrors.productName = 'Product Name must be at least 2 characters long.';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    }

    useEffect(() => {
        axios.get('http://localhost:8080/category/findAll').then((response) => {
            setCategories(response.data);
        });
    }, []);

    const notifysuccess = (msg) => {
        toast.success(msg, {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: 'colored'
        });
    }

    const addProduct = async () => {
        if (validateForm()) {
            await axiosAddProduct(product);
            notifysuccess(`New Product: '${product.productName}' added into the database successfully!!!`);
            history.push('/productsall');
        }
    }

    return (
        <div className='add-product-form' style={myComponent}>
            <Container maxWidth="sm">
                <Box my={5}>
                    <Typography variant="h5" align="center"><b>Add Product Details</b></Typography>
                    <FormGroup>
                        <FormControl style={formControlStyle}>
                            <InputLabel>Product Name</InputLabel>
                            <Input onChange={(e) => onValueInput(e)} name="productName" value={product.productName} />
                            {errors.productName && <span style={{ color: 'red' }}>{errors.productName}</span>}
                        </FormControl>
                        <FormControl style={formControlStyle}>
                            <InputLabel style={labelStyle}>Product Category</InputLabel>
                            <Input
                                disabled
                                value={selectedCategory ? selectedCategory.categoryName : ''}
                                endAdornment={
                                    <Button onClick={handleOpenDialog} color="primary">Select Category</Button>
                                }
                            />
                        </FormControl>
                        <FormControl style={formControlStyle}>
                            <InputLabel>Product Price</InputLabel>
                            <Input onChange={(e) => onValueInput(e)} name="productPrice" value={product.productPrice} />
                            {errors.productPrice && <span style={{ color: 'red' }}>{errors.productPrice}</span>}
                        </FormControl>
                        <Box my={3}>
                            <Button variant="text" onClick={() => addProduct()} color="primary" align="center">Add Product</Button>
                            <Button component={Link} to={`/productsall`} variant="text" color="secondary" align="center" style={{ margin: '0px 20px' }}>Cancel</Button>
                        </Box>
                    </FormGroup>
                </Box>
            </Container>
            
            {/* Dialog for selecting category */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Select a Category</DialogTitle>
                <DialogContent>
                    <Box>
                        {categories.map(category => (
                            <Button key={category.categoryId} onClick={() => handleSelectCategory(category)}>
                                {category.categoryName}
                            </Button>
                        ))}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddProduct;
