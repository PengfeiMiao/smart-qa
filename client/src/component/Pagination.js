import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import {useNavigate} from "react-router-dom";

function Pagination({ currentPage, totalPages, onPageChange, root }) {
  const navigate = useNavigate();

  const handlePathChange = (page) => {
    const newPath = `${root}/view/${page}`;
    navigate(newPath, {replace: true});
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handlePreviousPage = () => {
    onPageChange(currentPage - 1);
    handlePathChange(currentPage - 1);
  };

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
    handlePathChange(currentPage + 1);
  };

  return (
    <Box mt={4} display="flex" justifyContent="center">
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