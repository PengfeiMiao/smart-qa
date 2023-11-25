import React, {useEffect, useRef} from 'react';
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
import NotePanel from "./NotePanel";

const QuestionList = ({ questions, styles, scrollId }) => {
  const textStyle = {
    color: '#4e4e4e',
    fontSize: '16.75px'
  };
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && scrollId) {
      const targetElement = containerRef.current.querySelector(`#Ques-${scrollId}`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [scrollId, questions]);

  return (
    <Box mb={24} style={styles} ref={containerRef}>
      {questions?.map((question) => (
        <Box id={`Ques-${question.id}`} key={question.id} mt={4} marginX={8} border="1px solid gray" borderRadius="md"
             boxShadow="0 2px 4px rgba(0, 0, 0, 0.2)" fontFamily="sans-serif">
          <Box bgColor={"blue.300"} p={2} borderTopRadius="md">
            <Heading size='sm'>
              Question {question.id}
            </Heading>
          </Box>
          <Box p={4}>
            <Text style={textStyle}>{question.question}</Text>
            <List mt={2} paddingX={2}>
              {Object.entries(question.options).map(([key, value]) => (
                <ListItem key={key}>
                  <LabelValue
                    label={`${key}.`} value={value}
                    labelStyle={{marginRight: '10px'}}
                    valueStyle={textStyle}>
                  </LabelValue>
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
                  <LabelValue
                    label={'Answer:'} value={question.answer}
                    labelStyle={{width: '80px'}} translate="no"></LabelValue>
                  <LabelValue
                    label={'Vote:'} value={question.vote}
                    labelStyle={{width: '80px'}} translate="no"></LabelValue>
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
                  <NotePanel noteInfo={question?.notes?.[0] ?? {note: '', tags: []}} translate="no" />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Analysis question={question} translate="no"></Analysis>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default QuestionList;