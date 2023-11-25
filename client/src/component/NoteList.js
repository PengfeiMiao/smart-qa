import React from 'react';
import {Box, Heading} from '@chakra-ui/react';
import NotePanel from "./NotePanel";
import {useNavigate} from "react-router-dom";
import TagList from "./TagList";
import {upsertNote} from "../api/api";

const NoteList = ({ notes, tagList, styles }) => {
  const navigate = useNavigate();
  const handleLinkClicked = (note) => {
    let page = Math.ceil(note.question_id / 10);
    navigate(`/question-bank/${note.dataset_id}/view/${page}?questionId=${note.question_id}`);
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
              onSumbit={(tags) => handleTagSaved(tags, note)}
            ></TagList>
            <NotePanel
              noteInfo={note}
              handleLink={() => handleLinkClicked(note)}
              translate="no" />
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default NoteList;