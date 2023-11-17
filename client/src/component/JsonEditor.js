import React, {useContext, useState} from 'react';
import {
  Alert,
  AlertIcon,
  Box,
  ButtonGroup,
  Editable,
  EditablePreview,
  EditableTextarea,
  Flex,
  IconButton,
  Text,
  useEditableControls
} from '@chakra-ui/react';
import {updateDataset} from "../api/api";
import {GlobalContext} from "../store/GlobalProvider";
import {CheckIcon, CloseIcon, EditIcon} from "@chakra-ui/icons";

const JsonEditor = ({label, value, id}) => {
  const initialValue = JSON.stringify(value, null, 2) ?? '';
  const [updateStatus, setUpdateStatus] = useState(0);
  const [alertHidden, setAlertHidden] = useState(true);
  const [editedValue, setEditedValue] = useState(initialValue);
  const {getDatasetList} = useContext(GlobalContext);
  const alertMsg = ['Succeed to Update Dataset!', 'Failed to Update Dataset!', 'Failed to Parse Json!']

  function handleShowAlert() {
    setAlertHidden(false);
    setTimeout(() => setAlertHidden(true), 1000);
  }

  const handleConfirm = () => {
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
    });
  };

  const handleChange = (value) => {
    setEditedValue(value);
  };

  const EditableControls = () => {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent='left' size='sm'>
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent='left'>
        <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    )
  };

  return (
    <Box>
      <Alert position="fixed" w={"20vw"} minW={"200px"} left={"40vw"} top={0} zIndex={1000} borderRadius={5}
             status={updateStatus === 1 ? 'success' : 'error'} hidden={alertHidden}>
        <AlertIcon/>
        {alertMsg[updateStatus - 1]}
      </Alert>
      <Text fontWeight="bold" w={100} mb={1}>
        {label}
      </Text>
      <Editable
        onSubmit={handleConfirm}
        onChange={handleChange}
        style={{whiteSpace: 'pre-line'}}
        value={editedValue}
        isPreviewFocusable={false}
      >
        <EditablePreview maxH="250px" overflowY="auto" />
        <EditableTextarea rows={10} />
        <EditableControls />
      </Editable>
    </Box>
  );
};

export default JsonEditor;