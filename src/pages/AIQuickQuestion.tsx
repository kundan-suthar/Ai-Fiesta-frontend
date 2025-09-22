import { useState } from "react";
import { z } from "zod";
import { Toaster, toast } from "sonner";
import { generateAnswer } from "../api/question";

// Define schema using Zod
const questionSchema = z.object({
  passage: z.string().min(500, "passage must be at least 500 characters long."),
  question: z.string().min(10, "question must be at least 30 characters long."),
});

const AIQuickQuestion = () => {
  const [passage, setPassage] = useState("");
  const [question, setQuestion] = useState("");

  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  // Validate input using Zod

  const handleAnswer = async () => {
    const validation = questionSchema.safeParse({ passage, question });

    if (!validation.success) {
      // Show first error in a popup
      toast.error(validation.error.issues[0].message);
      console.error(validation.error.issues[0].message);

      return;
    }
    try {
      setLoading(true);
      const data = await generateAnswer(passage, question);
      setAnswer(data);
      toast.success("Answer generated successfully!");
    } catch (error) {
      console.error("Error during answer generation:", error);
      toast.error("An error occurred while genrating the answer.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container mx-auto px-4">
      {/* Sonner toaster for popups */}
      <Toaster position="top-right" richColors />
      <h1 className="mt-4 text-center w-[100%] text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-400">
        Question from any Passage Instantly with AI
      </h1>
      <h2 className="mt-2 text-center w-[100%] text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-400">
        Powered by{" "}
        <span className=" relative z-10  inline-block text-white after:passage-[''] after:w-full after:bg-fuchsia-400 after:inset-0 after:absolute  after:-z-10 after:-skew-2">
          META AI
        </span>
      </h2>
      <div className="flex  gap-2 justify-between mt-6">
        <div className="flex-1 min-h-96">
          <textarea
            name="passage"
            id="passage"
            value={passage}
            onChange={(e) => setPassage(e.target.value)}
            draggable="false"
            placeholder="Enter Passage here to question from it."
            className="w-full  resize-none h-full p-2 rounded-md outline-1 outline-slate-200 bg-slate-100"
          ></textarea>
        </div>
        <div className="flex flex-1">
          <div className="flex flex-col justify-center items-center gap-6 font-sans">
            {/* <div className="flex flex-col">
              <label htmlFor="languagesFrom" className="">
                Select Language
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
            </div> */}

            {/*  */}
          </div>
          <div className="flex-1  flex flex-col justify-between gap-1">
            <div className=" relative h-1/2">
              <textarea
                name="question"
                id="question"
                draggable="false"
                placeholder="enter your question here"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full  resize-none h-full p-2 z-10 rounded-md outline-1 outline-slate-200 bg-slate-100"
              ></textarea>
              <button
                onClick={handleAnswer}
                disabled={loading}
                className={`absolute  bottom-2 right-2 rounded-sm px-4 py-2 font-bold text-slate-100 outline-1 outline-blue-100 transition ${
                  loading
                    ? "bg-fuchsia-300 cursor-not-allowed"
                    : "bg-fuchsia-400 hover:cursor-pointer"
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
                    Answering...
                  </span>
                ) : (
                  `Answer`
                )}
              </button>
            </div>
            <div className=" h-1/2 ">
              <textarea
                name="answer"
                id="answer"
                draggable="false"
                placeholder="Answer"
                value={answer}
                className="w-full  resize-none h-full p-2 rounded-md outline-1 outline-slate-200 bg-slate-100"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIQuickQuestion;
