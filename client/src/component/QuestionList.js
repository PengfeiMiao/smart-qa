import React from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  List,
  ListItem,
  Text
} from '@chakra-ui/react';
import Analysis from "./Analysis";
import LabelValue from "./LabelValue";

const QuestionList = ({ questions }) => {
  return (
    <Box mb={24}>
      {questions?.map((question) => (
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
              <AccordionItem>
                <h2>
                  <AccordionButton pl={2}>
                    <Box as="span" flex='1' textAlign='left' fontWeight="bold">
                      Notes
                    </Box>
                    <AccordionIcon/>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={2}>
                  <LabelValue label={'Note1:'} value={'这是一条笔记'} labelStyle={{width: '80px'}}></LabelValue>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Analysis question={question}></Analysis>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default QuestionList;