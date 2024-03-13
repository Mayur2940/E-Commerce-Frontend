import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { axiosAllCategories } from '../Service-Components/ServiceCategory';

const AllCategories = () => {

  const [category, setCategory] = useState([]);
  useEffect(() => {
    getCategories();
  },[])//eslint-disable-line

  const getCategories = async () => {
    const response = await axiosAllCategories();
    console.log(response);
    setCategory(response.data);
  }
  return (



    <div>
      <div className="add-productbtn">
        <Button variant="contained" color="primary" align="center" component={Link} to={`/addCategory`}>Add Category</Button>
      </div>
      <div className='allcategories-tbl'>


        <TableContainer component={Paper} >
          <Table >
            <TableHead>
              <TableRow>
                <TableCell><b>ID</b></TableCell>
                <TableCell><b>CategoryName</b></TableCell>
                <TableCell><b>Action</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {category.map((item) => (
                <TableRow key={item.categoryId}>
                  <TableCell>{item.categoryId}</TableCell>
                  <TableCell>{item.categoryName}</TableCell>
                  <TableCell>
                    <Button component={Link} to={`/editCategory/${item.categoryId}`} variant="text" color="primary" size="small">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>



  )

}

export default AllCategories;