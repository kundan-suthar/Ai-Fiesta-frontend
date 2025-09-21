import axios from "axios";

const viteBaseURL = import.meta.env.VITE_API_BASE_URL;
export const summarize = async (content: string, summaryLength: string) => {
  const response = await axios.post(`${viteBaseURL}/api/v1/summary`, {
    content,
    summaryLength,
  });
  return response.data.result;
};
