import React, { useState } from 'react';
import { Box, Text, Textarea, Button } from '@chakra-ui/react';

const PromptEditor = ({ label, value }) => {
  const initialValue = JSON.stringify(value, null, 2)??'';
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(initialValue);

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
    setEditedValue(initialValue);
  };

  const handleConfirmEditing = () => {
    // 发送更新请求的逻辑
    // 在这里执行更新操作，将 editedValue 发送到服务器或其他适当的位置
    console.log('发送更新请求:', editedValue);

    setIsEditing(false);
    // 可以在这里执行其他操作，例如显示更新成功的消息等
  };

  const handleValueChange = (event) => {
    setEditedValue(event.target.value);
  };

  return (
    <Box>
      <Text fontWeight="bold" w={100} mb={1}>
        {label}
      </Text>
      {isEditing ? (
        <Box position="relative">
          <Textarea
            ml={2}
            style={{ whiteSpace: 'pre-line' }}
            value={editedValue}
            onChange={handleValueChange}
            onBlur={() => setIsEditing(false)}
            h={200}
          />
          <Box position="absolute" bottom={2} right={2} style={{ zIndex: 100 }}>
            <Button size="sm" colorScheme="green" mr={2} onClick={handleConfirmEditing}>
              确认
            </Button>
            <Button size="sm" colorScheme="red" onClick={handleCancelEditing}>
              取消
            </Button>
          </Box>
        </Box>
      ) : (
        <Textarea
          ml={2}
          style={{ whiteSpace: 'pre-line' }}
          value={editedValue}
          readOnly
          h={200}
          onClick={handleStartEditing}
        />
      )}
    </Box>
  );
};

export default PromptEditor;