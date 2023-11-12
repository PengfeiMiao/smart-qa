import React, {useState} from 'react';
import {Box, Button, Spinner, Text} from '@chakra-ui/react';
import { analyzeQuestion } from "../api/api";
import {CheckIcon, RepeatIcon} from '@chakra-ui/icons'

const Analysis = ({ questionId }) => {
  const [analysis, setAnalysis] = useState('');
  const [hidden, setHidden] = useState(true);
  const [loading, setLoading] = useState(false);

  function handleAnalysisStream() {
    setLoading(true);
    analyzeQuestion(questionId)
      .then(response => {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        const dataChunks = [];

        function readStream() {
          reader.read().then(({done, value}) => {
            if (done) {
              setLoading(false);
              return;
            }
            const chunk = decoder.decode(value, {stream: true});
            dataChunks.push(chunk);
            setAnalysis(dataChunks.join(''));
            readStream();
          });
        }

        // 开始读取数据流
        readStream();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const handleAnalyze = () => {
    setHidden(!hidden);
    if(!loading && !analysis) {
      handleAnalysisStream();
    }
  };

  const handleRefresh = () => {
    setAnalysis('');
    handleAnalysisStream();
  };

  return (
    <Box mt={4}>
      <Box mt={4} mb={2}>
        <Button
          onClick={handleAnalyze}
          mr={4}
        >
          Analysis
        </Button>
        <Spinner color='blue.300' size="xs" hidden={!loading} />
        <CheckIcon color='green.300' size="xs" hidden={!(!loading && analysis && hidden)} />
        <Button
          onClick={handleRefresh}
          hidden={!(!loading && analysis && !hidden)}
        >
          <RepeatIcon />
        </Button>
      </Box>
      <Box paddingX={4} hidden={hidden}>
        <Text style={{ whiteSpace: 'pre-line' }}>{analysis}</Text>
      </Box>
    </Box>
  );
}

export default Analysis;