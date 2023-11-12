import React, {useContext, useState} from 'react';
import {Box, Text, Textarea, Button, Alert, AlertIcon} from '@chakra-ui/react';
import {updateDataset} from "../api/api";
import {GlobalContext} from "../store/GlobalProvider";

const PromptEditor = ({label, value, id}) => {
  const initialValue = JSON.stringify(value, null, 2) ?? '';
  const [isEditing, setIsEditing] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(0);
  const [alertHidden, setAlertHidden] = useState(true);
  const [editedValue, setEditedValue] = useState(initialValue);
  const {getDatasetList} = useContext(GlobalContext);
  const alertMsg = ['Succeed to Update Dataset!', 'Failed to Update Dataset!', 'Failed to Parse Json!']

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
    setEditedValue(initialValue);
  };

  function handleShowAlert() {
    setAlertHidden(false);
    setTimeout(() => setAlertHidden(true), 1000);
  }

  const handleConfirmEditing = () => {
    let prompts;
    try {
      prompts = JSON.parse(editedValue);
    } catch (e) {
      setUpdateStatus(3);
      handleShowAlert();
      return;
    }
    updateDataset(id, {
      'id': id,
      'prompts': prompts
    }).then(() => {
      setUpdateStatus(1);
      getDatasetList();
    }).catch(() => {
      setUpdateStatus(2);
    }).finally(() => {
      handleShowAlert();
      setIsEditing(false);
    });
  };

  const handleValueChange = (event) => {
    setEditedValue(event.target.value);
  };

  return (
    <Box>
      <Alert position="fixed" w={"20vw"} left={"40vw"} top={0} zIndex={1000} borderRadius={5}
             status={updateStatus === 1 ? 'success' : 'error'} hidden={alertHidden}>
        <AlertIcon/>
        {alertMsg[updateStatus - 1]}
      </Alert>
      <Text fontWeight="bold" w={100} mb={1}>
        {label}
      </Text>
      {isEditing ? (
        <Box position="relative">
          <Textarea
            ml={2}
            style={{whiteSpace: 'pre-line'}}
            value={editedValue}
            onChange={handleValueChange}
            h={200}
          />
          <Box position="absolute" bottom={2} right={2} style={{zIndex: 100}}>
            <Button size="sm" colorScheme="green" mr={2} onClick={handleConfirmEditing}>
              Confirm
            </Button>
            <Button size="sm" colorScheme="red" onClick={handleCancelEditing}>
              Cancel
            </Button>
          </Box>
        </Box>
      ) : (
        <Textarea
          ml={2}
          style={{whiteSpace: 'pre-line'}}
          value={editedValue}
          readOnly
          h={200}
          onClick={handleStartEditing}
        />
      )}
    </Box>
  );
};

export default PromptEditor;