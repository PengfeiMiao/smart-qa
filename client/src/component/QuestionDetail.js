import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  List,
  ListItem,
  Text
} from "@chakra-ui/react";
import LabelValue from "./LabelValue";
import React from "react";

const QuestionDetail = ({question}) => {
  const textStyle = {
    color: '#4e4e4e',
    fontSize: '16.75px',
    whiteSpace: 'pre-line'
  };
  return (
    <>
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
      </Accordion>
    </>
  )
};

export default QuestionDetail;