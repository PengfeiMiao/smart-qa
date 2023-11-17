import {getCookie} from "../store/CacheStore";

// const BASE_URL = 'http://localhost:8000';
const BASE_URL = '/api';

export const getQuestions = async (datasetId, currentPage) => {
  return await fetchApi(`${BASE_URL}/datasets/${datasetId}/questions?page=${currentPage}`);
};

export const analyzeQuestion = async (datasetId, questionId) => {
  let token = preAuth();
  if (!token) {
    return;
  }
  return await fetch(`${BASE_URL}/datasets/${datasetId}/questions/${questionId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

export const getDatasets = async (currentPage, pageSize) => {
  return await fetchApi(`${BASE_URL}/datasets?page=${currentPage}&size=${pageSize}`);
};

export const updateDataset = async (datasetId, payload) => {
  return await updateApi(`${BASE_URL}/datasets/${datasetId}`, payload, 'PATCH');
};

export const upsertNote = async (payload) => {
  return await updateApi(`${BASE_URL}/notes`, payload, 'PUT');
};


export const updateQuestion = async (datasetId, questionId, payload) => {
  return await updateApi(`${BASE_URL}/datasets/${datasetId}/questions/${questionId}`, payload, 'PATCH');
};

export const loginApi = async (payload) => {
  return await updateApi(`${BASE_URL}/login`, payload, 'POST');
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
}

async function updateApi(url, payload, method) {
  return await fetchApi(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
}

function preAuth() {
  let token = getCookie('token');
  if (!token && window.location.pathname !== '/login') {
    window.location.assign('/login');
    return '';
  }
  return token;
}
