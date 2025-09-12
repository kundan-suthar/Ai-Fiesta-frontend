import { useState } from "react";
import { languages } from "../constants/languages";

const AITranslate = () => {
  const [language, setLanguage] = useState("en");

  return (
    <div className="container mx-auto px-4">
      <h1 className="mt-4 text-center w-[100%] text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-700">
        Instant AI Translation
      </h1>
      <h2 className="mt-2 text-center w-[100%] text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-700">
        Powered by{" "}
        <span className=" relative z-10  inline-block text-white after:content-[''] after:w-full after:bg-blue-400 after:inset-0 after:absolute  after:-z-10 after:-skew-2">
          META AI
        </span>
      </h2>
      <div className="flex  gap-2 justify-between mt-6">
        <div className=" flex-1 min-h-96">
          <textarea
            name="textToTranslate"
            id="textToTranslate"
            draggable="false"
            placeholder="Enter/paste text here to translate"
            className="w-full  resize-none h-full p-2 rounded-md outline-1 outline-slate-200 bg-slate-100"
          ></textarea>
        </div>
        <div className="flex flex-col justify-center items-center gap-6 font-sans">
          <div className="flex flex-col">
            <label htmlFor="languagesFrom" className="">
              Select Language
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
                    value={lang.code}
                    className="border-0 outline-0"
                  >
                    {lang.name}
                  </option>
                );
              })}
            </select>
          </div>
          <button className="bg-blue-400 rounded-sm px-4 py-2 font-bold text-slate-100 hover:cursor-pointer outline-1 outline-blue-100">
            Translate to {language}
          </button>
        </div>
        <div className="flex-1 min-h-96">
          <textarea
            name="textToTranslate"
            id="textToTranslate"
            draggable="false"
            placeholder="Translated Text"
            className="w-full resize-none h-full p-2 rounded-md outline-1 outline-slate-200 bg-slate-100"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default AITranslate;
