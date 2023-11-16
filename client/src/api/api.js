import {getCookie} from "../store/CacheStore";

const BASE_URL = 'http://localhost:8000';
// const BASE_URL = '/api';

export const getQuestions = async (datasetId, currentPage) => {
  return await fetchApi(`${BASE_URL}/datasets/${datasetId}/questions?page=${currentPage}`);
};

export const analyzeQuestion = async (datasetId, questionId) => {
  return await fetch(`${BASE_URL}/datasets/${datasetId}/questions/${questionId}`);
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

export const updateQuestion = async (datasetId, questionId, payload) => {
  let token = preAuth();
  if (!token) {
    return;
  }
  return await fetchApi(`${BASE_URL}/datasets/${datasetId}/questions/${questionId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
};

export const loginApi = async (payload) => {
  console.log(123)
  return await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
};

function fetchApi(url, options) {
  let token = preAuth();
  if (!token) {
    return;
  }
  if(!options) {
    options = {};
  }
  let {headers = {}} = options;
  options.headers = {...headers, 'Authorization': `Bearer ${token}`};
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
};

function preAuth() {
  let token = getCookie('token');
  if (!token && window.location.pathname !== '/login') {
    window.location.assign('/login');
    return '';
  }
  return token;
}
