import React, {useContext, useEffect, useState} from 'react';
import {Box, Spinner, Text} from '@chakra-ui/react';
import {searchNotes} from "../api/api";
import ToolBar from "../component/ToolBar";
import NoteList from "../component/NoteList";
import SimpleScroll from "../component/SimpleScroll";
import {GlobalContext} from "../store/GlobalProvider";
import {useParams} from "react-router-dom";
import NoteFilter from "../component/NoteFilter";

const initialPage = {
  data: [],
  page: 1,
  size: 10,
  total: 0
};

const NotePage = () => {
  const {datasetList} = useContext(GlobalContext);
  const {dataset} = useParams();

  const [notePage, setNotePage] = useState(initialPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [datasetId, setDatasetId] = useState(parseInt(dataset, 10) || 1);
  const [tagList, setTagList] = useState([]);
  const [searchParams, setSearchParams] = useState({});

  const getNoteList = async (page, params) => {
    let body = await searchNotes(params || searchParams, page || currentPage);
    setNotePage((prevPage) => ({
      ...body, data: prevPage.data.concat(body.data)
    }));
  };

  const handleNext = () => {
    getNoteList(currentPage + 1).then(() => {
      setCurrentPage((prevPage) => (prevPage + 1));
    })
  };

  const handleSearch = (payload) => {
    setNotePage(initialPage);
    setCurrentPage(1);
    setSearchParams(payload);
    getNoteList(1, payload).then();
  };


  useEffect(() => {
    getNoteList().then();
  }, []);

  useEffect(() => {
    let tags = datasetList?.find(dataset => dataset.id === datasetId)?.tags;
    setTagList(tags ?? []);
  }, [datasetList]);

  return (
    <Box h={'100vh'}>
      <ToolBar/>
      <NoteFilter tagList={tagList} onSearch={(payload) => handleSearch(payload)}/>
      <SimpleScroll
        handleNext={handleNext}
        currentPage={currentPage}
        moreHeight={45}
        hasMore={currentPage * notePage.size < notePage.total}
        loader={
          <Spinner color='blue.300' size="xs"/>
        }
      >
        <NoteList notes={notePage.data} tagList={tagList}></NoteList>
      </SimpleScroll>
    </Box>
  );
}

export default NotePage;