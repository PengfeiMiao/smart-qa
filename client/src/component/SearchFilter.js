import React, {useState} from 'react';
import {Box, Button, Input} from "@chakra-ui/react";

const SearchFilter = ({onSearch}) => {
  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    onSearch(keyword);
  };

  return (
    <Box padding={'12px 32px 2px 32px'} bgColor={'white'} boxShadow="sm">
      <Box display="flex" marginBottom={'10px'}>
        <Input placeholder='Keyword Search' w={'50vw'} mr={'10px'}
               value={keyword} onChange={(e) => setKeyword(e.target.value)}
        />
        <Button onClick={() => handleSearch()}>View</Button>
      </Box>
    </Box>
  );
};

export default SearchFilter;