import React, {useState} from 'react';
import {Box, Button, Input} from "@chakra-ui/react";

const SearchFilter = ({onSearch, children}) => {
  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    onSearch(keyword);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box padding={'12px 32px 2px 32px'} bgColor={'white'} boxShadow="sm">
      <Box display="flex" marginBottom={'10px'}>
        <Input placeholder='Keyword Search' w={'50vw'} mr={'10px'}
               value={keyword}
               onChange={(e) => setKeyword(e.target.value)}
               onKeyDown={handleKeyDown}
        />
        <Button onClick={() => handleSearch()}>View</Button>
      </Box>
      {children}
    </Box>
  );
};

export default SearchFilter;