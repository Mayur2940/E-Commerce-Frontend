import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, TextField } from '@mui/material';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { axiosAllCategories } from '../Service-Components/ServiceCategory';

const PAGE_SIZE = 5; // Number of categories per page
const MAX_PAGES_DISPLAYED = 3; // Maximum number of pagination buttons displayed

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getCategories();
  }, [currentPage]); // Refresh categories when page changes

  const getCategories = async () => {
    const response = await axiosAllCategories();
    setCategories(response.data);
  };

  // Filter categories based on search text
  const filteredCategories = categories.filter(category =>
    category.categoryName.toLowerCase().includes(searchText.toLowerCase())
  );

  // Sorting categories by name
  const sortedCategories = filteredCategories.slice().sort((a, b) => a.categoryName.localeCompare(b.categoryName));

  // Add sequential IDs after sorting
  const categoriesWithSequentialIds = sortedCategories.map((category, index) => ({
    ...category,
    id: index + 1
  }));

  const totalPages = Math.ceil(categoriesWithSequentialIds.length / PAGE_SIZE);

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
  const endIndex = Math.min(startIndex + PAGE_SIZE, categoriesWithSequentialIds.length);
  const currentPageCategories = categoriesWithSequentialIds.slice(startIndex, endIndex);

  return (
    <div>
      <div className="search-box" style={{ padding: '4px', backgroundColor: 'whitesmoke', display:'block', }}>
        <TextField
          label="Search by Category Name"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="add-productbtn">
        <Button variant="contained" color="primary" align="center" component={Link} to={`/addCategory`}>Add Category</Button>
      </div>
      <div className='allcategories-tbl' style={{ padding: '10px' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>ID</b></TableCell>
                <TableCell><b>Category Name</b></TableCell>
                <TableCell><b>Action</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentPageCategories.map((category) => (
                <TableRow key={category.categoryId}>
                  <TableCell>{category.id}</TableCell>
                  <TableCell>{category.categoryName}</TableCell>
                  <TableCell>
                    <Button component={Link} to={`/editCategory/${category.categoryId}`} variant="text" color="primary" size="small">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className='pagination' style={{ padding: '10px' }}>
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

export default AllCategories;
