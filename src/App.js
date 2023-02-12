import "semantic-ui-css/semantic.min.css";
import React, { useState, useEffect } from "react";
import "./App.css";
import { callGPT3 } from "./gpt3";
import AceEditor from "react-ace";
import { addHint, updateEvaluation } from "./utils";
import Swal from "sweetalert2";
import ReactLoading from "react-loading";
import { Dropdown } from "semantic-ui-react";
import { cs106a, cs106b, cs106b_assignment } from "./constants";

import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/theme-monokai";

const problems = cs106b_assignment;

const evals = ["No", "Not really", "Kinda", "Yes"];
function App() {
  const [view, setView] = useState("Problem");
  const [currentCode, setCurrentCode] = useState(problems[0].starter_code);
  const [gptResponses, setGptResponses] = useState([]);
  const [isGettingHelp, setIsGettingHelp] = useState(false);
  const [isRunningCode, setIsRunningCode] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(problems[0].value);
  const [selectedStarterFiles, setSelectedStarterFiles] = useState(
    problems[0].starter_files_url
  );
  const [selectedStyledProblem, setSelectedStyledProblem] = useState(
    problems[0].styledValue
  );
  const [selectedSolution, setSelectedSolution] = useState(
    problems[0].solution
  );

  const [output, setOutput] = useState(null);

  useEffect(() => {
    setGptResponses([]);
  }, [view]);

  const generateContext = (code) => {
    return `You are a warm, kind, and genuine CS instructor teaching students introductory programming. 
Your students will provide you a question, and then their answer. 
Your task is to provide them a hint that doesn't give them the exact solution but helps them identify the issue they're having and help them get unstuck. 
Before every hint you provide, say something encouraging to your student! 

Your goal is to help students find more joy in learning programming.

Here is the coding problem: 
"${selectedProblem}"

Here is your student's code: 
"${code}"

The student's code is not working. Can you give them a hint?`;
  };
  const generateHint = async (code) => {
    setIsGettingHelp(true);
    const context = generateContext(code);
    console.log(context);
    const response = await callGPT3(context);

    setIsGettingHelp(false);

    return response;
  };

  const runCode = async (code) => {
    setIsRunningCode(true);
    const pyodide = await window.loadPyodide();
    await pyodide.runPython(`
      import sys
      import io
      sys.stdout = io.StringIO()
  `);
    try {
      await pyodide.runPython(code);

      const stdout = pyodide.runPython("sys.stdout.getvalue()");
      setOutput(stdout);
    } catch (e) {
      setOutput(e.message);
    }
    setIsRunningCode(false);
  };
  const getHelp = async () => {
    const hint = await generateHint(currentCode);
    const id = await addHint(currentCode, hint, selectedProblem);

    setGptResponses([
      {
        id,
        hint,
      },
      ...gptResponses,
    ]);
  };
  const onChange = (newValue) => {
    setCurrentCode(newValue);
  };

  return (
    <div
      className="flex h-screen gap-4 justify-center bg-stone-100"
      style={{ alignItems: "center" }}
    >
      {view === "Problem" ? (
        <div className="bg-white rounded-lg p-4 w-1/2 flex flex-col justify-between">
          <div>
            <Dropdown
              placeholder="Select Problem"
              fluid
              search
              selection
              value={selectedProblem}
              onChange={(e, data) => {
                const prob =
                  problems[
                    problems.findIndex(({ value }) => value === data.value)
                  ];

                setSelectedProblem(data.value);
                setSelectedStarterFiles(prob.starter_files_url);
                setSelectedStyledProblem(prob.styledValue);
                setSelectedSolution(prob.solution);
                setCurrentCode(prob.starter_code);
              }}
              options={problems}
            />

            <div
              className="my-5 overflow-auto overflow-x-hidden"
              style={{ height: "400px" }}
            >
              {selectedStarterFiles ? (
                <div className="mb-4">
                  <a href={selectedStarterFiles} className="hover:underline">
                    Download Starter Files
                  </a>
                </div>
              ) : null}
              <p>{selectedStyledProblem}</p>
            </div>
          </div>
          <button
            onClick={() => {
              setView("Get Help");
            }}
            className="text-lg flex rounded-md w-full bg-red-500 text-white p-2 font-bold text-center justify-center content-center hover:bg-red-600"
          >
            I need help!
          </button>
        </div>
      ) : view === "Get Help" ? (
        <div className="flex flex-row gap-4" style={{ height: "500px" }}>
          <div className="flex flex-col bg-stone-100 gap-3">
            <div className="rounded-lg bg-white p-4 text-stone-700">
              Paste your <b>function code</b> from <b>QT Creator</b> below to
              get a hint!
            </div>
            <AceEditor
              id="editor"
              mode="csharp"
              theme="monokai"
              onChange={onChange}
              name="editor"
              value={currentCode}
              editorProps={{ $blockScrolling: true }}
              style={{
                "border-radius": "8px",
              }}
            />
            <div className="flex flex-row gap-3">
              {/* <button
            onClick={async () => {
              if (!isRunningCode) {
                await runCode(currentCode);
              } else {
                setIsRunningCode(false);
              }
            }}
            className="h-11	text-lg flex rounded-md w-full bg-red-500 text-white p-2 font-bold text-center justify-center content-center self-end hover:bg-red-600"
          >
            {isRunningCode ? (
              <>
                <ReactLoading
                  type={"spin"}
                  color={"white"}
                  height={"10%"}
                  width={"10%"}
                />
                <span className="mx-2">Cancel</span>
              </>
            ) : (
              <>Run Code</>
            )}
          </button> */}
              <button
                onClick={() => {
                  setView("Problem");
                }}
                className="h-11	text-lg flex rounded-md bg-gray-400 text-white py-2 px-6 font-bold text-center justify-center content-center self-end hover:bg-gray-500"
                disabled={isGettingHelp}
              >
                Back
              </button>
              <button
                onClick={() => {
                  getHelp();
                }}
                className="h-11	text-lg flex rounded-md w-full bg-blue-500 text-white p-2 font-bold text-center justify-center content-center self-end hover:bg-blue-600"
                disabled={isGettingHelp}
              >
                {isGettingHelp ? (
                  <ReactLoading
                    type={"spin"}
                    color={"white"}
                    height={"5%"}
                    width={"5%"}
                  />
                ) : (
                  <>Give me a hint!</>
                )}
              </button>
            </div>

            {/* <div
          className="rounded-lg bg-black text-white p-4 overflow-auto w-full"
          style={{
            height: "16%",
          }}
        >
          {output?.split("\n").map((line) => {
            return <div>{line}</div>;
          })}
        </div> */}
          </div>
          <div className="bg-white rounded-lg p-4 flex flex-col gap-4 w-80">
            {gptResponses.length > 0 ? (
              <div>
                <b className="text-lg">Was this hint helpful?</b>
                <div className="flex flex-row justify-between text-stone-600 mt-2">
                  {evals.map((val, i) => {
                    return (
                      <button
                        onClick={async () => {
                          await updateEvaluation(gptResponses[0].id, i + 1);

                          Swal.fire(
                            "Thank you!",
                            "Your feedback helps a lot.",
                            "success"
                          );
                        }}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
            <div className="bg-stone-100 rounded-lg w-full h-screen p-4 gap-2 flex flex-col overflow-auto">
              {gptResponses.map((hint, i) => {
                return (
                  <div
                    className="bg-blue-500 rounded-lg p-2 text-white text-sm"
                    style={{
                      opacity: i === 0 ? "1" : "0.3",
                    }}
                  >
                    {hint.hint}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
