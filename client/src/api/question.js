export const getQuestions = async (currentPage) => {
  return await fetch(`/api/saa?page=${currentPage}`);
};