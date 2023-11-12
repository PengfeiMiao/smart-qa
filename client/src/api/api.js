const BASE_URL = 'http://localhost:8000';
// const BASE_URL = '/api';

export const getQuestions = async (currentPage) => {
  return await fetch(`${BASE_URL}/saa?page=${currentPage}`);
};

export const analyzeQuestion = async (questionId) => {
  return await fetch(`${BASE_URL}/saa/${questionId}`);
};

export const getDatasets = async (currentPage, pageSize) => {
  return await fetch(`${BASE_URL}/datasets?page=${currentPage}&size=${pageSize}`);
};

export const updateDataset = async (datasetId, payload) => {
  return await fetch(`${BASE_URL}/datasets/${datasetId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
};
