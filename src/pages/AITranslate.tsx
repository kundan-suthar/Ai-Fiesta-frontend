import { useState } from "react";
import { languages } from "../constants/languages";
import { translateText } from "../api/translate";
import { z } from "zod";
import { Toaster, toast } from "sonner";

// Define schema using Zod
const translateSchema = z.object({
  content: z
    .string()
    .min(3, "Text must be at least 3 characters long.")
    .max(5000, "Text is too long."),
  language: z.string().min(1, "Please select a language."),
});

const AITranslate = () => {
  const [language, setLanguage] = useState("English");
  const [content, setContent] = useState("");
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(false);
  // Validate input using Zod

  const handleTranslate = async () => {
    const validation = translateSchema.safeParse({ content, language });

    if (!validation.success) {
      // Show first error in a popup
      toast.error(validation.error.issues[0].message);
      console.error(validation.error.issues[0].message);

      return;
    }
    try {
      setLoading(true);
      const data = await translateText(content, language);
      setTranslated(data);
      toast.success("Translation successful!");
    } catch (error) {
      console.error("Translation failed:", error);
      toast.error("Failed to translate. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container mx-auto px-4">
      {/* Sonner toaster for popups */}
      <Toaster position="top-right" richColors />
      <h1 className="mt-4 text-center w-[100%] text-2xl sm:text-5xl  font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-400">
        Instant AI Translation
      </h1>
      <h2 className="mt-2 text-center w-[100%] text-lg sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-400">
        Powered by{" "}
        <span className=" relative z-10  inline-block text-white after:content-[''] after:w-full after:bg-blue-400 after:inset-0 after:absolute  after:-z-10 after:-skew-2">
          META AI
        </span>
      </h2>
      <div className="flex flex-col sm:flex-row gap-2 justify-between mt-6">
        <div className=" flex-1 sm:min-h-96 ">
          <textarea
            name="textToTranslate"
            id="textToTranslate"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            draggable="false"
            placeholder="Enter/paste text here to translate"
            className="w-full  resize-none min-h-[200px] sm:h-full p-2 rounded-md outline-1 outline-slate-200 bg-slate-100"
          ></textarea>
        </div>
        <div className="flex sm:flex-col justify-center items-center gap-6 font-sans">
          <div className="flex flex-col gap-1">
            <label htmlFor="languagesFrom" className="">
              Language
            </label>
            <select
              name="languagesFrom"
              id="languagesFrom"
              className="outline-1 rounded-sm px-2 py-1 hover:cursor-pointer"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {languages.map((lang) => {
                return (
                  <option
                    key={lang.code}
                    value={lang.name}
                    className="border-0 outline-0"
                  >
                    {lang.name}
                  </option>
                );
              })}
            </select>
          </div>
          <button
            onClick={handleTranslate}
            disabled={loading}
            className={`rounded-sm px-4 py-2 font-bold text-slate-100 outline-1 outline-blue-100 transition ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-400 hover:cursor-pointer"
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
                Translating...
              </span>
            ) : (
              `Translate to ${language}`
            )}
          </button>
        </div>
        <div className="flex-1 sm:min-h-96">
          <textarea
            name="textToTranslate"
            id="textToTranslate"
            draggable="false"
            placeholder="Translated Text"
            value={translated}
            className="w-full resize-none sm:min-h-96 h-[200px] p-2 rounded-md outline-1 outline-slate-200 bg-slate-100"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default AITranslate;
