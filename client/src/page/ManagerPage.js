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
  Text
} from '@chakra-ui/react';
import JsonEditor from "../component/JsonEditor";
import LabelValue from "../component/LabelValue";
import {GlobalContext} from "../store/GlobalProvider";
import TagList from "../component/TagList";
import ToolBar from "../component/ToolBar";
import {updateDataset} from "../api/api";

const ManagerPage = () => {
  const {datasetList, getDatasetList} = useContext(GlobalContext);

  const handleTagSaved = (tags, dataset_id) => {
    updateDataset(dataset_id, {
      'id': dataset_id,
      'tags': tags
    }).then(() => {
      getDatasetList();
    });
  }

  return (
    <Box h={'100vh'}>
      <ToolBar/>
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
              <LabelValue label={'Total'} value={dataset.total} labelStyle={{width: '100px'}}/>
              <Divider marginY={2}/>
              <LabelValue label={'CreatedAt'} value={moment(dataset.created_at).format('YYYY-MM-DD HH:mm:ss')}
                          labelStyle={{width: '100px'}}/>
              <Divider marginY={2}/>
              <TagList
                tagStyle={{marginBottom: '10px'}}
                label={'Tags'}
                value={dataset.tags}
                onSumbit={(tags) => handleTagSaved(tags, dataset.id)}/>
              <Divider marginY={2}/>
              <JsonEditor label={'Prompts'} value={dataset.prompts} id={dataset.id}/>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
}

export default ManagerPage;