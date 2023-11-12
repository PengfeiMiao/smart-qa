const BASE_URL = 'http://localhost:8000';
// const BASE_URL = '/api';

export const getQuestions = async (currentPage) => {
  return await fetchApi(`${BASE_URL}/datasets/1/questions?page=${currentPage}`);
};

export const analyzeQuestion = async (questionId) => {
  return await fetch(`${BASE_URL}/datasets/1/questions/${questionId}`);
};

export const getDatasets = async (currentPage, pageSize) => {
  return await fetchApi(`${BASE_URL}/datasets?page=${currentPage}&size=${pageSize}`);
};

export const updateDataset = async (datasetId, payload) => {
  return await fetchApi(`${BASE_URL}/datasets/${datasetId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
};

function fetchApi(url, options) {
  return fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('An error occurred:', error);
      // throw error;
      // alert('An error occurred:' + error);
    });
}
