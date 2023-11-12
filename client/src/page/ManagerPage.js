import React, {useEffect, useState} from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Text
} from '@chakra-ui/react';
import './index.css'
import PromptEditor from "../component/PromptEditor";

const ManagerPage = () => {
  const [datasetList, setDatasetList] = useState([]);

  useEffect(() => {
    // getQuestions(currentPage).then(async res => {
    //   const body = await res.json();
    //   setDatasetList(body.data);
    //   setTotalPages(Math.ceil(body.total / body.size));
    // })
    setDatasetList([
      {
        "id": 1,
        "name": "AWS SAA-C03",
        "total": 623,
        "createAt": '2023-10-01',
        "tags": ['S3', 'CloudFront', '最低成本', '最小运营'],
        "prompts": [
          {"role": "user", "content": "{question}"},
          {"role": "system", "content": "请帮我回答以上问题"}
        ],
        "visibility": true
      },
      {
        "id": 2,
        "name": "AWS DVA-C03",
        "total": 100,
        "createAt": '2023-11-11',
        "tags": [],
        "prompts": [],
        "visibility": true
      }
    ]);
  }, []);

  const renderLabelValue = ({label, value}) => {
    return <Box display="flex">
      <Text fontWeight="bold" w={100}>{label}</Text><Text>{value}</Text>
    </Box>;
  }

  const renderLabelArrays = ({label, value}) => {
    return <Box>
      <Text fontWeight="bold" w={100} mb={1}>{label}</Text>
      {value.map((item, index) =>(
        <Text key={index} ml={2}>{item}</Text>
      ))}
    </Box>;
  }

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" ml={8}>Manager List</Text>
      <Accordion defaultIndex={[0]} allowMultiple mt={4} marginX={8}>
        {datasetList.map((dataset) => (
          <AccordionItem key={dataset.id}>
            <h2>
              <AccordionButton pl={2}>
                <Box as="span" flex='1' textAlign='left' fontWeight="bold">
                  {dataset.name}
                </Box>
                <AccordionIcon/>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={2}>
              {renderLabelValue({label: 'Total', value: dataset.total})}
              <Divider marginY={2}/>
              {renderLabelValue({label: 'CreateAt', value: dataset.createAt})}
              <Divider marginY={2}/>
              {renderLabelArrays({label: 'Tags', value: dataset.tags})}
              <Divider marginY={2}/>
              <PromptEditor label={'Prompts'} value={dataset.prompts}></PromptEditor>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
}

export default ManagerPage;