import {Box} from "@chakra-ui/react";
import React, {useState} from "react";
import MarkdownEditor from "./MarkdownEditor";
import {upsertNote} from "../api/api";

const NotePanel = ({question}) => {
  const [note, setNote] = useState(question?.notes?.[0] ?? {note: '', tags: []});

  const handleSubmit = async (newNote) => {
    if (newNote?.trim() === note.note) return;
    let resp = await upsertNote({
      question_id: question.id,
      dataset_id: question.dataset_id,
      note: newNote,
      tags: []
    });
    if (resp) {
      setNote({...note, note: newNote});
    }
  };

  return (<Box>
    <MarkdownEditor input={note.note} onSubmit={handleSubmit}></MarkdownEditor>
  </Box>);
};

export default NotePanel;