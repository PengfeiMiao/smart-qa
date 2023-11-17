import React, {useContext} from 'react';
import moment from 'moment';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Tag,
  TagCloseButton,
  TagLabel,
  Text
} from '@chakra-ui/react';
import JsonEditor from "../component/JsonEditor";
import LabelValue from "../component/LabelValue";
import {GlobalContext} from "../store/GlobalProvider";
import {AddIcon} from "@chakra-ui/icons";
import ToolBar from "../component/ToolBar";

const ManagerPage = () => {
  const {datasetList} = useContext(GlobalContext);

  const renderLabelArrays = ({label, value}) => {
    return <Box>
      <ToolBar/>
      <Text fontWeight="bold" w={100} mb={1}>{label}</Text>
      {value.map((item, index) => (
        <Tag
          size="md"
          key={index}
          borderRadius='full'
          variant='solid'
          colorScheme='green'
          mr={2}
        >
          <TagLabel>{item}</TagLabel>
          <TagCloseButton/>
        </Tag>
      ))}
      <Tag
        size="md"
        borderRadius='full'
        variant='solid'
        colorScheme='green'
      >
        <TagLabel as={AddIcon}/>
      </Tag>
    </Box>;
  }

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" ml={8}>Manager List</Text>
      <Accordion defaultIndex={[0]} allowMultiple mt={4} marginX={8}>
        {datasetList?.map((dataset) => (
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
              <LabelValue label={'Total'} value={dataset.total} labelStyle={{width: '100px'}}></LabelValue>
              <Divider marginY={2}/>
              <LabelValue label={'CreatedAt'} value={moment(dataset.created_at).format('YYYY-MM-DD HH:mm:ss')}
                          labelStyle={{width: '100px'}}></LabelValue>
              <Divider marginY={2}/>
              {renderLabelArrays({label: 'Tags', value: dataset.tags})}
              <Divider marginY={2}/>
              <JsonEditor label={'Prompts'} value={dataset.prompts} id={dataset.id}></JsonEditor>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
}

export default ManagerPage;