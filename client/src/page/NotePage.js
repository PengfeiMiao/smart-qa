import React, {useEffect, useState} from 'react';
import {Box, Spinner, Text} from '@chakra-ui/react';
import {searchNotes} from "../api/api";
import ToolBar from "../component/ToolBar";
import NoteList from "../component/NoteList";
import SimpleScroll from "../component/SimpleScroll";

const NotePage = () => {
  const [notePage, setNotePage] = useState({
    data: [],
    page: 1,
    size: 10,
    total: 0
  });
  const [currentPage, setCurrentPage] = useState(1);

  const getNoteList = async () => {
    let body = await searchNotes({}, currentPage);
    setNotePage((prevPage) => ({
      ...body, data: prevPage.data.concat(body.data)
    }));
  };

  useEffect(() => {
    if (currentPage > 0) {
      getNoteList().then();
    }
  }, [currentPage]);

  const handleNext = () => setCurrentPage((prevPage) => (prevPage + 1));

  return (
    <Box h={'100vh'}>
      <ToolBar />
      <SimpleScroll
        handleNext={handleNext}
        currentPage={currentPage}
        hasMore={currentPage * notePage.size < notePage.total}
        loader={
          <Spinner color='blue.300' size="xs" />
        }
      >
        <Text fontSize="xl" fontWeight="bold" ml={8}>Note List</Text>
        <NoteList notes={notePage.data}></NoteList>
      </SimpleScroll>
    </Box>
  );
}

export default NotePage;