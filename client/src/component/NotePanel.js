import {Box} from "@chakra-ui/react";
import React, {useState} from "react";
import MarkdownEditor from "./MarkdownEditor";
import {upsertNote} from "../api/api";

const NotePanel = ({noteInfo, handleLink, translate}) => {
  const [note, setNote] = useState(noteInfo);

  const handleSubmit = async (newNote) => {
    if (newNote?.trim() === note.note) return;
    let resp = await upsertNote({
      question_id: note.question_id,
      dataset_id: note.dataset_id,
      note: newNote,
      tags: []
    });
    if (resp) {
      setNote({...note, note: newNote});
    }
  };

  return (<Box>
    <MarkdownEditor
      input={note.note}
      onSubmit={handleSubmit}
      onLink={handleLink}
      linkTips={`jump to question #${note.question_id}`}
      translate={translate} />
  </Box>);
};

export default NotePanel;