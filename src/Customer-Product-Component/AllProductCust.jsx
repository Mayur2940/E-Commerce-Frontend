import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Card, CardContent, CardActions, Button, Paper } from '@mui/material';
import { axiosAllProducts, axiosGetBycategoryId } from '../Service-Components/ServiceProduct';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiosAddToCart } from '../Service-Components/ServiceCart';
import axios from 'axios';
import DisplayImageCust from './DisplayImageCust';
import './AllProductCust.css';

toast.configure();

const AllProductCust = () => {
    const history = useHistory();
    const [product, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const [sortBy, setSortBy] = useState(""); // State variable for sorting

    useEffect(() => {
        getProducts();
        axios.get('http://localhost:8080/category/findAll').then((response) => {
            setCategories(response.data);
        });
    }, []);

    const getProducts = async () => {
        const response = await axiosAllProducts();
        setProduct(response.data);
    };

    const DisplayCategoryProducts = async (id) => {
        if (id !== "") {
            const response = await axiosGetBycategoryId(id);
            setProduct(response.data);
        }
        if (id === "") {
            getProducts();
        }
        setSelectedCategoryId(id);
    };

    const notifysuccess = (msg) => {
        toast.success(msg, {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: 'colored',
        });
    };

    const addToCart = async (id) => {
        let custid = sessionStorage.getItem('id');
        axiosAddToCart(custid, id);
        notifysuccess('Product added to cart successfully');
        history.push('/viewproducts');
    };

    const handleSortChange = (e) => {
        const sortOption = e.target.value;
        setSortBy(sortOption);
        // Implement sorting logic here
        if (sortOption === 'productName') {
            const sortedProducts = [...product].sort((a, b) => a.productName.localeCompare(b.productName));
            setProduct(sortedProducts);
        } else if (sortOption === 'productPrice') {
            const sortedProducts = [...product].sort((a, b) => parseFloat(a.productPrice) - parseFloat(b.productPrice));
            setProduct(sortedProducts);
        } else {
            // Display all products when "None" option is selected
            getProducts();
        }
    };
    
    

    return (
        <div className="all-product-cust">
            <Paper className="categories-paper">
                <Typography variant="h6" className="category-title">
                    Category
                </Typography>
                <div className="category-list">
                    <select
                        value={selectedCategoryId}
                        onChange={(e) => DisplayCategoryProducts(e.target.value)}
                        className="category-dropdown"
                    >
                        <option value="">All</option>
                        {categories.map((category) => (
                            <option key={category.categoryId} value={category.categoryId}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Sort By:</label>
                    <select value={sortBy} onChange={handleSortChange}>
                        <option value="">None</option>
                        <option value="productName">Name</option>
                        <option value="productPrice">Price</option>
                    </select>
                </div>
            </Paper>

            <div className="product-cards">
                {product.map((data) => (
                    <Card key={data.productId}>
                        <div className="image-container">
                            <DisplayImageCust image={data.productImage} />
                        </div>
                        <CardContent>
                            <Typography variant="h6">{data.productName}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                Price: {data.productPrice}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                onClick={() => addToCart(data.productId)}
                                variant="text"
                                color="primary"
                                size="small"
                            >
                                Add To Cart
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default AllProductCust;
