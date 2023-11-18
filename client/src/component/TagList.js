import {Box, Editable, EditableInput, EditablePreview, Tag, TagCloseButton, TagLabel, Text} from "@chakra-ui/react";
import ToolBar from "./ToolBar";
import {AddIcon} from "@chakra-ui/icons";
import React, {useContext, useRef, useState, useEffect} from "react";
import {GlobalContext} from "../store/GlobalProvider";
import {updateDataset} from "../api/api";

const TagList = ({label, value, id}) => {
  const {getDatasetList} = useContext(GlobalContext);
  const [tags, setTags] = useState(value ?? []);
  const [inEdit, setInEdit] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inEdit && inputRef.current) {
      inputRef.current.focus();
    }
  }, [tags]);

  const handleCreate = () => {
    setTags([...tags, ""]);
    setInEdit(true);
  };

  const handleChange = (index, newVal) => {
    let oldTags = Array.from(tags);
    oldTags[index] = newVal;
    setTags(oldTags);
  };

  const handleClose = (index) => {
    tags.splice(index, 1);
    updateDataset(id, {
      'id': id,
      'tags': tags
    }).then(() => {
      getDatasetList();
    });
  };

  return (
    <Box>
      <ToolBar/>
      <Text fontWeight="bold" w={100} mb={1}>{label}</Text>
      {tags.map((item, index) => (
        <Tag
          size="md"
          key={index}
          borderRadius="full"
          variant="solid"
          colorScheme="green"
          mr={2}
        >
          <TagLabel>
            <Editable value={item} onChange={(val) => handleChange(index, val)}>
              <EditablePreview />
              <EditableInput ref={index === tags.length - 1 ? inputRef : null} />
            </Editable>
          </TagLabel>
          <TagCloseButton onClick={() => handleClose(index)} />
        </Tag>
      ))}
      <Tag
        size="md"
        borderRadius="full"
        variant="solid"
        colorScheme="green"
      >
        <TagLabel as={AddIcon} onClick={handleCreate}/>
      </Tag>
    </Box>
  );
};

export default TagList;