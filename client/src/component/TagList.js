import {Box, Editable, EditableInput, EditablePreview, Tag, TagCloseButton, TagLabel, Text} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import React, {useContext, useEffect, useRef, useState} from "react";
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

  const handleSave = () => {
    updateDataset(id, {
      'id': id,
      'tags': tags
    }).then(() => {
      getDatasetList();
    });
  };

  const handleCreate = () => {
    setTags([...tags, "New Tag"]);
    setInEdit(true);
  };

  const handleChange = (index, newVal) => {
    let oldTags = Array.from(tags);
    oldTags[index] = newVal;
    setTags(oldTags);
  };

  const handleClose = (index) => {
    tags.splice(index, 1);
    handleSave();
  };

  const computeWidth = (item) => {
    const inputText = item;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = "inherit";
    const textWidth = context.measureText(inputText).width;
    return `${textWidth * 1.5 + 10}px`;
  };

  return (
    <Box>
      <Text fontWeight="bold" w={100} mb={1}>{label}</Text>
      <Box lineHeight={2} mt={3} translate="no">
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
              <Editable
                value={item}
                placeholder={'New Tag'}
                onEdit={() => setInEdit(false)}
                onChange={(val) => handleChange(index, val)}
                onBlur={handleSave}
              >
                <EditablePreview ref={index === tags.length - 1 ? inputRef : null}/>
                <EditableInput width={computeWidth(item)}/>
              </Editable>
            </TagLabel>
            <TagCloseButton onClick={() => handleClose(index)}/>
          </Tag>
        ))}
        <Tag
          size="md"
          borderRadius="full"
          variant="solid"
          colorScheme="green"
          onClick={handleCreate}
        >
          <TagLabel as={AddIcon} />
        </Tag>
      </Box>
    </Box>
  );
};

export default TagList;