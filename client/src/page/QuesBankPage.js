import React, {useContext, useEffect, useState} from 'react';
import {Box, Text} from '@chakra-ui/react';
import Pagination from '../component/Pagination';
import {getQuestions} from "../api/api";
import {useParams} from "react-router-dom";
import {GlobalContext} from "../store/GlobalProvider";
import QuestionList from "../component/QuestionList";
import ToolBar from "../component/ToolBar";

const QuesBankPage = () => {
  const {setCurrentPosition} = useContext(GlobalContext);
  const { dataset, page } = useParams();
  const [questionList, setQuestionList] = useState([]);
  const [datasetId, setDatasetId] = useState(parseInt(dataset, 10) || 1);
  const [currentPage, setCurrentPage] = useState(parseInt(page, 10) || 1);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const getQuestionList = async () => {
    let body = await getQuestions(datasetId, currentPage);
    setQuestionList(body?.data);
    setTotalPages(Math.ceil(body?.total / body?.size));
  };

  useEffect(() => {
    getQuestionList().then();
    setCurrentPosition({datasetId, page: currentPage});
  }, [currentPage]);

  return (
    <Box h={'100vh'}>
      <ToolBar/>
      <Text fontSize="xl" fontWeight="bold" ml={8}>Question List</Text>
      <QuestionList questions={questionList} styles={{paddingBottom: '100px'}}></QuestionList>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onRoute={(page) => `/question-bank/${datasetId}/view/${page}`}
      />
    </Box>
  );
}

export default QuesBankPage;