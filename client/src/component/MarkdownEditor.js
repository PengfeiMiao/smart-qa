import React, {useState} from "react";
import ReactMarkdown from "react-markdown";
import {
  Box,
  ButtonGroup,
  Editable,
  EditableTextarea,
  Flex,
  IconButton, Text,
  useEditableControls
} from "@chakra-ui/react";
import styles from './MarkdownEditor.module.css'
import {CheckIcon, CloseIcon, EditIcon} from "@chakra-ui/icons";
import remarkGfm from "remark-gfm";
import rehypeReact from "rehype-react";

const MarkdownEditor = ({input, onSubmit, translate}) => {
  const [markdown, setMarkdown] = useState(input ?? '');
  const [inEdit, setInEdit] = useState(false);

  const handleChange = (value) => {
    setMarkdown(value);
  };

  const handleConfirm = () => {
    if (onSubmit) onSubmit(markdown);
    setInEdit(false);
  };

  const handleCancel = () => {
    setMarkdown(input);
    setInEdit(false);
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
        <IconButton size='sm' mt={1} icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    )
  };

  return (
    <Box style={styles}>
      <Text p={2} borderRadius={4} background={'gray.100'} hidden={inEdit || !markdown || !markdown.trim()} translate={translate}>
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeReact]}>{markdown}</ReactMarkdown>
      </Text>
      <Editable
        onSubmit={handleConfirm}
        onCancel={handleCancel}
        onChange={handleChange}
        onEdit={() => setInEdit(true)}
        style={{whiteSpace: 'pre-line'}}
        value={markdown}
        placeholder={'take note here, markdown is supported~'}
        isPreviewFocusable={false}
      >
        <EditableTextarea rows={5} p={2} hidden={!inEdit}/>
        <EditableControls />
      </Editable>
    </Box>
  );
};

export default MarkdownEditor;