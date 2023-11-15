import React, {useEffect, useState} from 'react';
import {Box, Button, Spinner, Text} from '@chakra-ui/react';
import {analyzeQuestion, updateQuestion} from "../api/api";
import {CheckIcon, PlusSquareIcon, RepeatIcon} from '@chakra-ui/icons'
import {getHash, refreshHash, removeHash, setHash} from "../store/CacheStore";

const Analysis = ({ question }) => {
  const [analysis, setAnalysis] = useState(question.analysis ?? '');
  const [hidden, setHidden] = useState(true);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const cacheKey = 'analysis';

  useEffect(() => {
    let hash = getHash(cacheKey, question.id);
    if(!analysis && hash) {
      setAnalysis(hash);
    }
  }, []);

  function handleAnalysisStream() {
    setLoading(true);
    analyzeQuestion(question.dataset_id, question.id)
      .then(response => {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        const dataChunks = [];

        function readStream() {
          reader.read().then(({done, value}) => {
            if (done) {
              setLoading(false);
              setHash(cacheKey, question.id, dataChunks.join(''));
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
    } else {
      refreshHash(cacheKey, question.id);
    }
  };

  const handleRefresh = () => {
    setAnalysis('');
    handleAnalysisStream();
  };

  const  handleUpload = async () => {
    setUploading(true);
    await updateQuestion(1, question.id, { id: question.id, analysis });
    removeHash(cacheKey, question.id);
    setTimeout(() => setUploading(false), 300);
  };

  return (
    <Box mt={4}>
      <Box mt={4} mb={2}>
        <Button
          mr={4}
          onClick={handleAnalyze}
        >
          Analysis
        </Button>
        <Spinner color='blue.300' size="xs" hidden={!loading || !hidden} />
        <CheckIcon color='green.300' size="xs" hidden={!(!loading && analysis && hidden)} />
        <Button
          mr={4}
          onClick={handleRefresh}
          hidden={hidden}
        >
          {!loading ? <RepeatIcon /> : <Spinner size="xs" />}
        </Button>
        <Button
          onClick={handleUpload}
          hidden={!(!loading && analysis && !hidden)}
        >
          {!uploading ? <PlusSquareIcon /> : <Spinner size="xs" />}
        </Button>
      </Box>
      <Box paddingX={4} hidden={hidden}>
        <Text style={{ whiteSpace: 'pre-line' }}>{analysis}</Text>
      </Box>
    </Box>
  );
}

export default Analysis;