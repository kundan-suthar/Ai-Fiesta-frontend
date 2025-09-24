import axios from "axios";
import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { getResponse } from "../api/chat";
const viteBaseURL = import.meta.env.VITE_API_BASE_URL;

const AIChatBot = () => {
  const [threadId, setThreadId] = useState<string | null>(null);
  const [chatMessage, setChatMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);

  const getThreadID = async () => {
    const threadID = await axios.post(`${viteBaseURL}/api/v1/new-chat`);
    console.log(threadID.data.thread_id);
    setThreadId(threadID.data.thread_id);
  };

  const handleSend = async () => {
    console.log(chatMessage);
    setMessages((prev) => [...prev, chatMessage]);
    try {
      if (threadId) {
        const data = await getResponse(chatMessage, threadId);
        console.log(data);
        setMessages((prev) => [...prev, data]);
      }
    } catch (error) {
      console.log(error);
    }
    setChatMessage("");
  };
  if (threadId === null) {
    return (
      <div className="text-primaryText h-[100dvh] p-3 ">
        <div className="flex h-full flex-col items-center justify-center  ">
          <h1 className="text-4xl font-bold">AI Chat Bot</h1>
          <p className="leading-9">
            A lightweight chatbot built with the{" "}
            <span className="font-semibold">LangChain</span> framework.
          </p>
          <p className="leading-9 text-center max-w-[800px]">
            It includes conversational memory to maintain context across
            messages and supports dynamic tool calling for enhanced
            functionality.
          </p>

          <button
            onClick={getThreadID}
            className="hover:bg-slate-400 hover:cursor-pointer max-w-56 p-4 rounded-xl border border-slate-400 "
          >
            Start conversation
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="text-primaryText  relative min-h-screen  ">
        <div className=" absolute  bottom-5  w-full">
          <div className="mb-4 space-y-2">
            {messages.map((msg, i) => (
              <div key={i} className="p-2 rounded ">
                <p className="dark:text-black">{msg}</p>
              </div>
            ))}
          </div>
          <div className="relative p-2">
            <textarea
              name="chatInput"
              id="chatInput"
              placeholder="enter here"
              className="resize-none w-full p-2 border bg-slate-500 border-slate-400 outline-0 rounded-xl max-h-32"
              draggable="false"
              rows={2}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto"; // reset to shrink if needed
                target.style.height = `${target.scrollHeight}px`; // set height to content
              }}
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            ></textarea>
            <button
              onClick={handleSend}
              className="absolute right-3 m-1 p-1 bottom-4 text-amber-50 bg-black rounded-full hover:cursor-pointer "
            >
              <ArrowUp />
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default AIChatBot;
