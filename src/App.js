import { useState } from "react";
import "./App.css";
import { callGPT3 } from "./gpt3";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";

const problem = `Given string s. Return the string with '@@' added at its beginning and end. Unless the string is length 3 or less, then add a more modest '@' at both ends.`;
function App() {
  const [currentCode, setCurrentCode] = useState(null);
  const [gptResponses, setGptResponses] = useState([]);

  const generateContext = (code) => {
    return `
      You are a CS instructor teaching students introductory programming. 
      Your students will provide you a question, and then their answer. 
      Your task is to provide them a hint that doesn't give them the exact solution but helps them identify the issue they're having and help them get unstuck. 
      
      Here is my coding problem: 
      ${problem}

      Here is my code: 
      ${code}

      This isn't working. Can you give me a hint? 
      `;
  };
  const generateHint = async (code) => {
    const context = generateContext(code);
    const response = await callGPT3(context);

    return response.data?.choices[0]?.text ?? "No response";
  };

  const runCode = async (code) => {
    let pyodide = await window.loadPyodide();
    console.log(
      pyodide.runPython(`
          import sys
          sys.version
      `)
    );
    const output = pyodide.runPython(code);
    console.log("OUTPUT: ", output);
  };
  const getHelp = async () => {
    const hint = await generateHint(currentCode);

    setGptResponses([...gptResponses, hint]);
  };
  const onChange = (newValue) => {
    setCurrentCode(newValue);
  };

  return (
    <div className="flex flex-row h-screen pt-32 gap-4 justify-center bg-stone-100">
      <div
        className="w-80 bg-white ml-5 rounded-lg p-4"
        style={{ height: "75%" }}
      >
        <b>Coding Problem:</b>
        <p>{problem}</p>
      </div>
      <div className="flex flex-col bg-stone-100 gap-3">
        <AceEditor
          mode="python"
          theme="monokai"
          onChange={onChange}
          name="editor"
          editorProps={{ $blockScrolling: true }}
          style={{
            "border-radius": "8px",
            height: "50%",
          }}
        />
        <div className="flex flex-row gap-3">
          <button
            onClick={async () => {
              runCode(currentCode);
            }}
            className="rounded-md w-full bg-red-500 text-white p-2 font-bold text-center self-end hover:bg-red-600"
          >
            Run Code
          </button>
          <button
            onClick={() => {
              getHelp();
            }}
            className="rounded-md w-full bg-blue-500 text-white p-2 font-bold text-center self-end hover:bg-blue-600"
          >
            Get Help!
          </button>
        </div>

        <div
          className="rounded-lg bg-black"
          style={{
            height: "17.5%",
          }}
        >
          Hello
        </div>
      </div>
      <div
        className="w-80 bg-white rounded-lg p-4 flex flex-col gap-4"
        style={{ height: "75%" }}
      >
        <div className="bg-stone-100 rounded-lg w-full h-screen p-4 gap-2 flex flex-col">
          {gptResponses.map((hint) => {
            return (
              <div className="bg-blue-500 rounded-lg p-2 text-white text-xs">
                {hint}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
