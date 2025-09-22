import axios from "axios";

const viteBaseURL = import.meta.env.VITE_API_BASE_URL;
export const generateAnswer = async (passage: string, question: string) => {
  const response = await axios.post(`${viteBaseURL}/api/v1/question`, {
    passage,
    question,
  });
  return response.data.result;
};
