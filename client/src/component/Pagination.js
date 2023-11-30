import React from 'react';
import {Box, Button} from '@chakra-ui/react';

function Pagination({currentPage, totalPages, onPageChange}) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handlePreviousPage = () => {
    onPageChange(currentPage - 1);
    scrollToTop();
  };

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
    scrollToTop();
  };

  return (
    <Box paddingY={3} position={'fixed'} w={'100%'} bottom={0} background={'white'}
         boxShadow={'0 -2px 4px rgba(0, 0, 0, 0.1)'} display="flex" justifyContent="center">
      <Button
        onClick={handlePreviousPage}
        isDisabled={currentPage === 1}
        mr={2}
      >
        Previous
      </Button>
      <Button
        onClick={handleNextPage}
        isDisabled={currentPage === totalPages}
      >
        Next
      </Button>
    </Box>
  );
}

export default Pagination;