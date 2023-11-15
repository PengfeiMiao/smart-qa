import React, {useContext, useEffect, useState} from 'react';
import {
  Box,
  Text,
  ListItem,
  Heading,
  List,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon, AccordionPanel
} from '@chakra-ui/react';
import Pagination from '../component/Pagination';
import {getQuestions} from "../api/api";
import './index.css'
import Analysis from "../component/Analysis";
import {useParams} from "react-router-dom";
import LabelValue from "../component/LabelValue";
import {GlobalContext} from "../store/GlobalProvider";
import QuestionList from "../component/QuestionList";

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
    <Box>
      <Text fontSize="xl" fontWeight="bold" ml={8}>Question List</Text>
      <QuestionList questions={questionList}></QuestionList>
      <Box className={"pagination-container"}>
        <Pagination
          datasetId={datasetId}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          root={'/questions'}
        />
      </Box>
    </Box>
  );
}

export default QuesBankPage;