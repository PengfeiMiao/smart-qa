import React, {useContext, useEffect, useState} from 'react';
import {Box, Skeleton} from '@chakra-ui/react';
import Pagination from '../component/Pagination';
import {getQuestions} from "../api/api";
import {useLocation, useParams} from "react-router-dom";
import {GlobalContext} from "../store/GlobalProvider";
import QuestionList from "../component/QuestionList";
import ToolBar from "../component/ToolBar";
import SearchFilter from "../component/SearchFilter";

const QuesBankPage = () => {
  const {setCurrentPosition} = useContext(GlobalContext);
  const {dataset, page} = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentQuestionId = searchParams.get('questionId');
  const [questionList, setQuestionList] = useState([]);
  const [datasetId, setDatasetId] = useState(parseInt(dataset, 10) || 1);
  const [currentPage, setCurrentPage] = useState(parseInt(page, 10) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [questionLike, setQuestionLike] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSearch = (keyword) => {
    setQuestionLike(keyword);
    setCurrentPage(1);
  };

  const getQuestionList = async () => {
    setLoading(true);
    let body = await getQuestions(datasetId, currentPage, questionLike);
    setQuestionList(body?.data);
    setTotalPages(Math.ceil(body?.total / body?.size));
    setLoading(false);
  };

  useEffect(() => {
    getQuestionList().then();
    setCurrentPosition({datasetId, page: currentPage});
  }, [currentPage, questionLike]);

  return (
    <Box h={'100vh'}>
      <ToolBar/>
      <SearchFilter onSearch={handleSearch}/>
      <Skeleton isLoaded={!loading} height={'100%'}>
        <QuestionList styles={{paddingBottom: '100px'}} questions={questionList} scrollId={currentQuestionId}/>
      </Skeleton>
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