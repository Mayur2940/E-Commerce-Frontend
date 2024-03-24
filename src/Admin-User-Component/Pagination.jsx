// Pagination.jsx

import React from 'react';
import { Button } from '@mui/material';

const Pagination = ({ currentPage, totalPages, goToPage }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <>
      <Button
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
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
        onClick={() => goToPage(currentPage + 1)}
        variant="outlined"
        style={{ margin: '5px' }}
      >
        Next
      </Button>
    </>
  );
};

export default Pagination;
