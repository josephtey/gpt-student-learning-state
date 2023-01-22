import { useState } from "react";
import "./App.css";
import { callGPT3 } from "./gpt3";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";

const problem = `Given string s. Find the first '@' within s. Return the len-3 substring immediately following the '@'. Except, if there is no '@' or there are not 3 chars after the @, return ''.`
const [currentCode, setCurrentCode] = useState(null);
const [gptResponses, setGptResponses] = useState([]);

const generateContext = (code) => {
  return `
    You are a CS instructor teaching students introductory programming. Your students will provide you a question, and then their answer. 
    You are a kind and caring instructor, who wants their students to truly understand what they're learning. 
    As a result of this, you avoid giving direct answers to your students, and encourage them to think about the mistake they have made.

    Here is your student's question:
    ${problem}
    
    Here is your student's answer:
    ${code}
    
    Look for key differences the student has made, but instead of simply telling the student what they’ve done wrong, provide them hints that can help them rectify their approach to solving the problem. 
    Keep your answers concise and to the point. Do not give them the answer. Only tell a student, where they're going wrong and not explicitly what to change in their code. 
    Give less explicit hints and tell a student the learning concept they have gotten wrong. 
    Speak to the student in first person. 
    In your answer, include at least one question that makes a student think about the learning concept they made a mistake in. Furthermore, specify the line the error is happening in.
    
    Here is the learning concept you're struggling with, as well as the specific mistake you're making:
      `;
};
const generateHint = async (code) => {
  const context = generateContext(code);
  const response = await callGPT3(context);

  return response.data?.choices[0]?.text ?? "No response";
};

const runCode = async (code) => {
  let pyodide = await window.loadPyodide();
  pyodide.runPython(`
        import sys
        sys.version
    `);
  const output = pyodide.runPython(code);
  console.log("OUTPUT: ", output);
};
const getHelp = async () => {
  const hint = await generateHint(currentCode);

  setGptResponses([hint, ...gptResponses]);
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
      <div className="bg-stone-100 rounded-lg w-full h-screen p-4 gap-2 flex flex-col overflow-auto">
        {gptResponses.map((hint, i) => {
          return (
            <div
              className="bg-blue-500 rounded-lg p-2 text-white text-xs"
              style={{
                opacity: i === 0 ? "1" : "0.3",
              }}
            >
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
