import "semantic-ui-css/semantic.min.css";
import React, { useState, useEffect } from "react";
import "./App.css";
import { callGPT3 } from "./gpt3";
import AceEditor from "react-ace";
import { addHint, updateEvaluation, updateEvaluationText } from "./utils";
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

  const generateContext = (query, code) => {
    return `You are a warm, kind, and genuine CS instructor teaching students introductory programming. 
            Struggle is an important part of learning. Your goal is to help students find joy in learning programming, while embracing this struggle.

            Your task is to provide them a hint that satisfies the following requirements: 
            1. The hint doesn't give away the exact solution. 
            2. The hint helps the student identify the underlying issue, and tries to help the student get unstuck. 
            3. The hint begins with an encouraging message that motivates the student to push on. 
            4. The hint should end with a guiding question that helps the student. 

            Don't explicitly say that you are giving an encouraging message.

            Here is the coding problem you are trying to give hints for: 
            "${selectedProblem}"

            I am your student, and here is my code: 
            "${code}"

            Here is my current thought process: 
            "${query}"

            My code is not working. Can you give me a hint?`;
  };
  const generateHint = async (query, code) => {
    setIsGettingHelp(true);
    const context = generateContext(query, code);
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
  const getHelp = async (query) => {
    const hint = await generateHint(query, currentCode);
    const id = await addHint(query, currentCode, hint, selectedProblem);

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

            <div className="my-5 overflow-auto overflow-x-hidden">
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
              Paste the code from your <b>combine.cpp</b> file to get a hint!
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
                onClick={async () => {
                  setView("Problem");
                }}
                className="h-11	text-lg flex rounded-md bg-gray-400 text-white py-2 px-6 font-bold text-center justify-center content-center self-end hover:bg-gray-500"
                disabled={isGettingHelp}
              >
                Back
              </button>
              <button
                onClick={async () => {
                  const { value: text } = await Swal.fire({
                    input: "textarea",
                    title: "Tell us what you're thinking!",
                    inputLabel:
                      "Describe what you think your code is doing right now.",
                    inputPlaceholder:
                      "How are you currently thinking about this problem? It doesn't have to be perfect. Understanding you helps us understand your problem.",
                    inputAttributes: {
                      "aria-label": "Type your message here",
                    },
                    showCancelButton: true,
                  });

                  if (text) {
                    getHelp(text);
                  }
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
          <div className="bg-white rounded-lg p-4 flex flex-col gap-4 w-96">
            {/* {gptResponses.length > 0 ? (
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
            ) : null} */}
            <div className="bg-stone-100 rounded-lg w-full h-screen p-4 gap-4 flex flex-col overflow-auto">
              {gptResponses.map((hint, i) => {
                return (
                  <div>
                    <div
                      className="bg-red-400 rounded-lg p-2 text-white text-xs font-bold cursor-pointer hover:bg-red-500 mb-2"
                      style={{
                        opacity: i === 0 ? "1" : "0.3",
                      }}
                      onClick={async () => {
                        const { value: rating, isConfirmed: ratingConfirmed } =
                          await Swal.fire({
                            title: "Rate this hint.",
                            icon: "question",
                            input: "range",
                            inputLabel: "How helpful was this?",
                            inputAttributes: {
                              min: 0,
                              max: 100,
                              step: 5,
                            },
                            inputValue: 50,
                          });

                        if (ratingConfirmed) {
                          await updateEvaluation(gptResponses[i].id, rating);

                          const {
                            value: textRating,
                            isConfirmed: textRatingConfirmed,
                          } = await Swal.fire({
                            input: "textarea",
                            title: "How did you feel?",
                            inputLabel:
                              "Describe how you felt after seeing the hint ❤️",
                            inputPlaceholder: "I felt...",
                            inputAttributes: {
                              "aria-label": "Type your message here",
                            },
                            showCancelButton: true,
                          });

                          await updateEvaluationText(
                            gptResponses[i].id,
                            textRating
                          );

                          if (ratingConfirmed && textRatingConfirmed) {
                            Swal.fire(
                              "Thank you!",
                              "Your feedback helps a lot.",
                              "success"
                            );
                          }
                        }
                      }}
                    >
                      Click to rate hint!
                    </div>
                    <div
                      className="bg-blue-500 rounded-lg p-2 text-white text-sm"
                      style={{
                        opacity: i === 0 ? "1" : "0.3",
                      }}
                    >
                      {hint.hint}
                    </div>
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
