import React, {useState} from 'react';
import {Box, Button, Input, Text} from "@chakra-ui/react";
import TagList from "./TagList";

const NoteFilter = ({tagList, onSearch}) => {
  const [tags, setTags] = useState([]);
  const [keyword, setKeyword] = useState('');
  const handleTagSelected = (values) => {
    setTags(values);
    handleSearch(values);
  };
  const handleSearch = (newTags=tags) => {
    onSearch({
      note: keyword,
      tags: newTags
    });
  };

  return (<Box padding={'12px 32px 2px 32px'} bgColor={'white'} boxShadow="sm">
    <Box display="flex" marginBottom={'10px'}>
      <Input placeholder='Keyword Search' w={'50vw'} mr={'10px'}
             value={keyword} onChange={(e) => setKeyword(e.target.value)}
      />
      <Button onClick={() => handleSearch()}>View</Button>
    </Box>
    <TagList
      label={'Tags:'} value={tags}
      editable={false}
      tagStyle={{display: 'flex', width: '60px', marginLeft: '16px'}}
      tagDict={tagList}
      onSumbit={(values) => handleTagSelected(values)}
    ></TagList>
  </Box>);
};

export default NoteFilter;