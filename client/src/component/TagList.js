import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Tag,
  TagCloseButton,
  TagLabel,
  Text
} from "@chakra-ui/react";
import { Select } from 'antd';
import {AddIcon} from "@chakra-ui/icons";
import React, {useEffect, useRef, useState} from "react";

const TagList = ({label, value, onSumbit, tagStyle, tagDict, editable = true}) => {
  const inputRef = useRef(null);
  const [tags, setTags] = useState(value ?? []);
  const [inEdit, setInEdit] = useState(false);
  const [tagOptions, setTagOptions] = useState(tagDict ?? []);

  useEffect(() => {
    if (inEdit && inputRef.current) {
      inputRef.current.focus();
    }
  }, [tags]);

  useEffect(() => {
    const filteredOptions = tagDict?.filter(item => !tags.includes(item)).sort() ?? [];
    setTagOptions(filteredOptions);
  }, [tags, tagDict]);

  const handleSave = (newTags) => {
    onSumbit(newTags);
    setTags(newTags);
    setInEdit(false);
  };

  const handleCreate = () => {
    if (editable) {
      setTags([...tags, "New Tag"]);
      setInEdit(true);
    } else {
      setInEdit((prevState) => (!prevState));
    }
  };

  const handleSelectChange = (option) => {
    handleSave([...tags, option]);
  };

  const handleChange = (index, newVal) => {
    let oldTags = Array.from(tags);
    oldTags[index] = newVal;
    setTags(oldTags);
  };

  const handleClose = (index) => {
    let newTags = [...tags];
    newTags.splice(index, 1);
    handleSave(newTags);
  };

  const computeWidth = (item) => {
    const inputText = item;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = "inherit";
    return context.measureText(inputText).width;
  };

  return (
    <Box display={tagStyle?.display ?? 'block'} marginBottom={'10px'}>
      <Text fontWeight="bold" w={'100px'} style={{...tagStyle, color: 'black'}}>{label}</Text>
      <Box translate="no" display={'flex'} flexWrap={'wrap'} rowGap={'5px'} maxW={'90vw'}>
        {tags.map((item, index) => (
          <Tag
            key={index}
            size="md"
            maxH={'20px'}
            maxW={'90%'}
            mr={2}
            borderRadius="full"
            variant="solid"
            colorScheme="green"
            whiteSpace="nowrap"
            overflow="hidden"
          >
            <TagLabel>
              <Editable
                value={item}
                placeholder={'New Tag'}
                onEdit={() => setInEdit(false)}
                onChange={(val) => handleChange(index, val)}
                onBlur={() => handleSave(tags)}
              >
                <EditablePreview
                  ref={index === tags.length - 1 ? inputRef : null}
                  style={!editable ? {pointerEvents: 'none'} : undefined}/>
                <EditableInput width={`${computeWidth(item) * 1.5 + 10}px`}/>
              </Editable>
            </TagLabel>
            <TagCloseButton onClick={() => handleClose(index)}/>
          </Tag>
        ))}
        <Box display={'flex'} alignItems={'center'} background={'green.500'} h={'24px'} borderRadius={'1.35em'}>
          {!editable && inEdit &&
            <Select
              showSearch
              bordered={false}
              dropdownStyle={{width: '200px'}}
              placeholder="Select option"
              optionFilterProp="children"
              onChange={handleSelectChange}
              onSearch={() => {}}
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
              options={tagOptions.map((item) => ({label: item, value: item}))}>
            </Select>
          }
          <Tag
            size="md"
            w={editable || !inEdit ? '30px' : '34px'}
            borderRadius="full"
            variant="solid"
            colorScheme="green"
            onClick={handleCreate}
          >
            <TagLabel as={AddIcon}/>
          </Tag>
        </Box>
      </Box>
    </Box>
  );
};

export default TagList;