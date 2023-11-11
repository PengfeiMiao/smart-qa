import React from 'react';
import { Box, Button } from '@chakra-ui/react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePreviousPage = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <Box mt={4} display="flex" justifyContent="center">
      <Button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        mr={2}
      >
        Previous
      </Button>
      <Button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </Box>
  );
}

export default Pagination;