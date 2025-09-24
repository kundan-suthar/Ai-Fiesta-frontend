import axios from "axios";

const viteBaseURL = import.meta.env.VITE_API_BASE_URL;
export const getResponse = async (message: string, thread_id: string) => {
  const response = await axios.post(`${viteBaseURL}/api/v1/send-message`, {
    message,
    thread_id,
  });
  return response.data.reply;
};
