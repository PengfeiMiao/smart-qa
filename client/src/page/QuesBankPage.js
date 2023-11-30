import React, {useContext, useEffect, useState} from 'react';
import {Box, Skeleton} from '@chakra-ui/react';
import Pagination from '../component/Pagination';
import {getQuestions} from "../api/api";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {GlobalContext} from "../store/GlobalProvider";
import QuestionList from "../component/QuestionList";
import ToolBar from "../component/ToolBar";
import SearchFilter from "../component/SearchFilter";

const QuesBankPage = () => {
  const {setCurrentPosition} = useContext(GlobalContext);
  const navigate = useNavigate();
  const {dataset, page} = useParams();
  const searchParams = new URLSearchParams(location.search);
  const currentQuestionId = searchParams.get('questionId');
  const keyword = searchParams.get('keyword');
  const [questionList, setQuestionList] = useState([]);
  const [datasetId, setDatasetId] = useState(parseInt(dataset, 10) || 1);
  const [currentPage, setCurrentPage] = useState(parseInt(page, 10) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [questionLike, setQuestionLike] = useState(keyword ?? '');
  const [loading, setLoading] = useState(false);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSearch = (value) => {
    setQuestionLike(value);
    setCurrentPage(1);
  };

  const handleRoute = (page=currentPage) => {
    return `/question-bank/${datasetId}/view/${page}${questionLike ? '?keyword=' + questionLike : ''}`;
  }

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
    navigate(handleRoute(), {replace: true});
  }, [currentPage, questionLike]);

  return (
    <Box h={'100vh'}>
      <ToolBar/>
      <SearchFilter onSearch={handleSearch} defaultValue={keyword}/>
      <Skeleton isLoaded={!loading} height={'100%'}>
        <QuestionList styles={{paddingBottom: '100px'}} questions={questionList} scrollId={currentQuestionId}/>
      </Skeleton>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onRoute={(page) => handleRoute(page)}
      />
    </Box>
  );
}

export default QuesBankPage;