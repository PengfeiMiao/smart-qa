import React, {useState} from 'react';
import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import NotePanel from "./NotePanel";
import TagList from "./TagList";
import {getQuestion, upsertNote} from "../api/api";
import QuestionDetail from "./QuestionDetail";

const NoteList = ({notes, tagList, styles}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [questionDisplay, setQuestionDisplay] = useState();

  const handleLinkClicked = async (note) => {
    let question = await getQuestion(note.dataset_id, note.question_id);
    if (Object.keys(question).length > 0) {
      setQuestionDisplay(question);
      onOpen();
    }
  };

  const handleTagSaved = async (tags, note) => {
    await upsertNote({
      question_id: note.question_id,
      dataset_id: note.dataset_id,
      id: note.id,
      tags: tags
    });
  };

  return (
    <Box style={styles}>
      {notes?.map((note, index) => (
        <Box key={index + 1} mt={4} marginX={8} borderColor="white" borderRadius="md"
             boxShadow="0 2px 4px rgba(0, 0, 0, 0.2)" fontFamily="sans-serif">
          <Box bgColor={"gray.300"} p={2} borderTopRadius="md">
            <Heading size='sm'>
              Note {note.id}
            </Heading>
          </Box>
          <Box p={4}>
            <TagList
              label={'Tags:'} value={note.tags}
              editable={false}
              tagStyle={{display: 'flex', width: '60px'}}
              tagDict={tagList}
              onSumbit={(tags) => handleTagSaved(tags, note)}/>
            <NotePanel
              noteInfo={note}
              handleLink={() => handleLinkClicked(note)}
              translate="no"/>
          </Box>
        </Box>
      ))}
      <Modal isOpen={isOpen} onClose={onClose} size={'3xl'}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader bgColor={'gray.300'} borderTopRadius={6} display={'flex'}>
            Question {questionDisplay?.id}
            <ModalCloseButton top={'auto'} right={'16px'}/>
          </ModalHeader>
          <ModalBody>
            <QuestionDetail question={questionDisplay}/>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' onClick={onClose}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default NoteList;