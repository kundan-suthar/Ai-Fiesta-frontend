import { useState } from "react";
import { z } from "zod";
import { Toaster, toast } from "sonner";
import { summarize } from "../api/summary";
import { summaryLengths } from "../constants/summaryLength";

// Define schema using Zod
const summarySchema = z.object({
  content: z.string().min(100, "Text must be at least 100 characters long."),

  summaryLength: z.enum(["short", "medium", "long"]),
});

const AISummary = () => {
  const [content, setContent] = useState("");
  const [summaryLength, setSummaryLength] = useState("short");
  const [summarized, setSummarized] = useState("");
  const [loading, setLoading] = useState(false);
  // Validate input using Zod

  const handleSummmarize = async () => {
    const validation = summarySchema.safeParse({ content, summaryLength });

    if (!validation.success) {
      // Show first error in a popup
      toast.error(validation.error.issues[0].message);
      console.error(validation.error.issues[0].message);

      return;
    }
    try {
      setLoading(true);
      const data = await summarize(content, summaryLength);
      setSummarized(data);
      toast.success("Text summarized successfully!");
    } catch (error) {
      console.error("Error during summarization:", error);
      toast.error("An error occurred while summarizing the text.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container mx-auto px-4 min-h-svh overflow-y-hidden ">
      {/* Sonner toaster for popups */}
      <Toaster position="top-right" richColors />
      <h1 className="mt-4 text-center w-[100%] text-2xl  sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-400">
        Summarize any text Instantly with AI
      </h1>
      <h2 className="mt-2 text-center w-[100%] text-lg sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-400">
        Powered by{" "}
        <span className=" relative z-10  inline-block text-white after:content-[''] after:w-full after:bg-emerald-400 after:inset-0 after:absolute  after:-z-10 after:-skew-2">
          META AI
        </span>
      </h2>
      <div className="flex flex-col sm:flex-row gap-2 justify-between mt-6">
        <div className=" flex-1 sm:min-h-96">
          <textarea
            name="TextToSummarize"
            id="TextToSummarize"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            draggable="false"
            placeholder="Enter/paste text here to Summarize"
            className="w-full  resize-none min-h-[200px] sm:h-full p-2 rounded-md outline-1 outline-slate-200 bg-slate-100"
          ></textarea>
        </div>
        <div className="flex sm:flex-col justify-center items-center gap-6 font-sans">
          <div className="flex flex-col items-center">
            <label htmlFor="languagesFrom" className="">
              Summary Length
            </label>
            <select
              name="languagesFrom"
              id="languagesFrom"
              className="outline-1 rounded-sm px-2 py-1 hover:cursor-pointer"
              value={summaryLength}
              onChange={(e) => setSummaryLength(e.target.value)}
            >
              {summaryLengths.map((summ) => {
                return (
                  <option
                    key={summ.value}
                    value={summ.value}
                    className="border-0 outline-0"
                  >
                    {summ.label}
                  </option>
                );
              })}
            </select>
          </div>

          <button
            onClick={handleSummmarize}
            disabled={loading}
            className={`rounded-sm px-4 py-2 font-bold text-slate-100 outline-1 outline-blue-100 transition ${
              loading
                ? "bg-emerald-300 cursor-not-allowed"
                : "bg-emerald-400 hover:cursor-pointer"
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Summarizing...
              </span>
            ) : (
              `Summarize`
            )}
          </button>
        </div>
        <div className="flex-1 sm:min-h-96">
          <textarea
            name="summarizedText"
            id="summarizedText"
            draggable="false"
            placeholder="summarized Text"
            value={summarized}
            className="w-full resize-none min-h-[200px] sm:h-full p-2 rounded-md outline-1 outline-slate-200 bg-slate-100"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default AISummary;
