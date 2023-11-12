import React, {useEffect, useState} from 'react';
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

const QuestionPage = () => {
  const { page } = useParams();
  const [questionList, setQuestionList] = useState([]);
  const [currentPage, setCurrentPage] = useState(parseInt(page, 10) || 1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getQuestions(currentPage).then(async res => {
      const body = await res.json();
      setQuestionList(body.data);
      setTotalPages(Math.ceil(body.total / body.size));
    })
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" ml={8}>Question List</Text>
      {questionList.map((question) => (
        <Box key={question.id} mt={4} marginX={8} border="1px solid gray" borderRadius="md"
             boxShadow="0 2px 4px rgba(0, 0, 0, 0.2)" fontFamily="sans-serif">
          <Box bgColor={"blue.300"} p={2} borderTopRadius="md">
            <Heading size='sm'>
              Question {question.id}
            </Heading>
          </Box>
          <Box p={4}>
            <Text>{question.question}</Text>
            <List mt={2} paddingX={2}>
              {Object.entries(question.options).map(([key, value]) => (
                <ListItem key={key}>
                  <LabelValue label={`${key}.`} value={value} labelStyle={{marginRight: '10px'}}></LabelValue>
                </ListItem>
              ))}
            </List>
            <Accordion allowMultiple mt={4}>
              <AccordionItem>
                <h2>
                  <AccordionButton pl={2}>
                    <Box as="span" flex='1' textAlign='left' fontWeight="bold">
                      Answers
                    </Box>
                    <AccordionIcon/>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={2}>
                  <LabelValue label={'Answer:'} value={question.answer} labelStyle={{width: '80px'}}></LabelValue>
                  <LabelValue label={'Vote:'} value={question.vote} labelStyle={{width: '80px'}}></LabelValue>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Analysis questionId={question.id}></Analysis>
          </Box>
        </Box>
      ))}

      <Box className={"pagination-container"}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          root={'/questions'}
        />
      </Box>
    </Box>
  );
}

export default QuestionPage;