import axios from "axios";

const viteBaseURL = import.meta.env.VITE_API_BASE_URL;
export const translateText = async (content: string, language: string) => {
  const response = await axios.post(`${viteBaseURL}/api/v1/translate`, {
    content,
    language,
  });
  return response.data.result;
};
