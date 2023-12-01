import React, {useEffect, useRef} from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading
} from '@chakra-ui/react';
import Analysis from "./Analysis";
import NotePanel from "./NotePanel";
import QuestionDetail from "./QuestionDetail";

const QuestionList = ({ questions, styles, scrollId }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && scrollId) {
      const targetElement = containerRef.current.querySelector(`#Ques-${scrollId}`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [scrollId, questions]);

  const getNoteInfo = (question) => {
    return question?.notes?.[0] ?? {note: '', tags: [], question_id: question.id, dataset_id: question.dataset_id};
  };

  return (
    <Box mb={24} style={styles} ref={containerRef} background={'#F9F9F9'}>
      {questions?.map((question) => (
        <Box id={`Ques-${question.id}`} key={question.id} mt={4} marginX={8} border="1px solid gray" borderRadius="md"
             boxShadow="0 2px 4px rgba(0, 0, 0, 0.2)" fontFamily="sans-serif">
          <Box bgColor={"blue.300"} p={2} borderTopRadius="md">
            <Heading size='sm'>
              Question {question.id}
            </Heading>
          </Box>
          <Box p={4}>
            <QuestionDetail question={question}/>
            <Accordion allowMultiple>
              <AccordionItem style={{borderTop: 'inherit'}}>
                <h2>
                  <AccordionButton pl={2}>
                    <Box as="span" flex='1' textAlign='left' fontWeight="bold">
                      Notes
                    </Box>
                    <AccordionIcon/>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={2}>
                  <NotePanel noteInfo={getNoteInfo(question)} translate="no" />
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