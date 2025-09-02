
"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [regex, setRegex] = useState("");
  const [group, setGroup] = useState("0");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    let pattern;
    try {
      pattern = new RegExp(regex, "g");
    } catch (err) {
      setError("Invalid regex: " + err.message);
      setOutput("");
      return;
    }
    const groupTokens = group.split(/[;,\s]+/).filter(Boolean).map(Number);
    let buff = [];
    let match;
    try {
      while ((match = pattern.exec(input)) !== null) {
        for (let i = 0; i < groupTokens.length; i++) {
          const idx = groupTokens[i];
          if (match[idx] !== undefined) {
            if (match[idx].length > 0) {
              buff.push(match[idx]);
            }
          } else {
            setError(`Group ${idx} does not exist.`);
            setOutput("");
            return;
          }
        }
      }
      setOutput(buff.join("\n"));
    } catch (err) {
      setError("Error: " + err.message);
      setOutput("");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-stretch justify-start p-0 m-0 w-full">
      <div className="w-full bg-white dark:bg-[#18181b] rounded-none shadow-none p-4 sm:p-8 flex flex-col gap-6 border-b border-gray-200 dark:border-gray-700 flex-1 min-h-[800px]" style={{minHeight: '800px'}}>
        <h1 className="text-2xl font-bold mb-2 text-center">RegexMania <span className="text-base font-normal">by Abdul Arfan</span></h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <div className="flex flex-wrap gap-2 items-center w-full">
            <label className="font-mono">regex</label>
            <textarea
              className="font-mono border rounded px-2 py-1 w-full resize-x bg-gray-50 dark:bg-[#23232a]"
              rows={1}
              value={regex}
              onChange={e => setRegex(e.target.value)}
              placeholder="Enter regex pattern"
              required
            />
            <label className="font-mono">group</label>
            <input
              className="font-mono border rounded px-2 py-1 w-20 bg-gray-50 dark:bg-[#23232a]"
              type="text"
              value={group}
              onChange={e => setGroup(e.target.value)}
              placeholder="0"
              required
            />
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-semibold shadow"
            >
              Submit
            </button>
          </div>
          {error && <div className="text-red-600 font-mono text-sm">{error}</div>}
        </form>
        <div className="flex flex-col md:flex-row gap-4 w-full flex-1 min-h-0" style={{minHeight: '500px', height: '100%'}}>
          <div className="flex-1 flex flex-col min-w-0 h-full">
            <label className="font-mono mb-1">Input</label>
            <textarea
              className="font-mono border rounded px-2 py-1 resize bg-gray-50 dark:bg-[#23232a] w-full h-full flex-1 min-h-0"
              style={{minHeight: '400px', height: '100%'}}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Enter input text here"
            />
          </div>
          <div className="flex-1 flex flex-col min-w-0 h-full">
            <label className="font-mono mb-1">Output</label>
            <textarea
              className="font-mono border rounded px-2 py-1 resize bg-gray-50 dark:bg-[#23232a] w-full h-full flex-1 min-h-0"
              style={{minHeight: '400px', height: '100%'}}
              value={output}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}
