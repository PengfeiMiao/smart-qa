import React from 'react';
import {Box, Heading} from '@chakra-ui/react';
import NotePanel from "./NotePanel";
import {useNavigate} from "react-router-dom";

const NoteList = ({ notes, styles }) => {
  const navigate = useNavigate();
  const handleLinkClicked = (note) => {
    let page = Math.ceil(note.question_id / 10);
    navigate(`/question-bank/${note.dataset_id}/view/${page}?questionId=${note.question_id}`);
  };

  return (
    <Box style={styles}>
      {notes?.map((note, index) => (
        <Box key={index + 1} mt={4} marginX={8} border="0 solid white" borderRadius="md"
             boxShadow="0 2px 4px rgba(0, 0, 0, 0.2)" fontFamily="sans-serif">
          <Box bgColor={"gray.300"} p={2} borderTopRadius="md">
            <Heading size='sm'>
              Note {note.id}
            </Heading>
          </Box>
          <Box p={4}>
            <NotePanel noteInfo={note} handleLink={() => handleLinkClicked(note)} translate="no" />
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default NoteList;