// const BASE_URL = 'http://localhost:8000';
const BASE_URL = '/api';

export const getQuestions = async (currentPage) => {
  return await fetch(`${BASE_URL}/saa?page=${currentPage}`);
};

export const analyzeQuestion = async (questionId) => {
  return await fetch(`${BASE_URL}/saa/${questionId}`);
};