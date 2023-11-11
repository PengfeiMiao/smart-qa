import React, { useEffect, useState } from 'react';
import { Box, Text, UnorderedList, ListItem } from '@chakra-ui/react';
import Pagination from '../component/Pagination';
import { getQuestions } from "../api/question";

function QuestionPage() {
  const [questionList, setQuestionList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getQuestions(currentPage).then(async res => {
      const body = await res.json()
      setQuestionList(body.data);
      setTotalPages(body.total);
    })
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold">Question List</Text>
      {questionList.map((question) => (
        <Box key={question.id} mt={4} p={4} border="1px solid gray" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold" mb={2}>Question {question.id}</Text>
          <Text>{question.question}</Text>
          <UnorderedList mt={2}>
            {Object.entries(question.options).map(([key, value]) => (
              <ListItem key={key}>{`${key}: ${value}`}</ListItem>
            ))}
          </UnorderedList>
          <Text mt={2}>Answer: {question.answer}</Text>
          <Text mt={2}>Vote: {question.vote}</Text>
        </Box>
      ))}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Box>
  );
}

export default QuestionPage;