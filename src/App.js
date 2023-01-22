import { useEffect } from "react";
import "./App.css";
import { callGPT3 } from "./gpt3";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";

function App() {
  useEffect(() => {
    const test = async () => {
      const response = await callGPT3("hello! how are you.");

      console.log(response);
    };

    test();
  }, []);

  const onChange = (newValue) => {};

  return (
    <div className="flex flex-row h-screen pt-32 gap-4 justify-center bg-stone-100">
      <div className="w-80 bg-white ml-5 rounded-lg p-4 h-96">
        <b>Coding Problem:</b>
        <p>
          We are looking for the name of an internet host within a string. Find
          the '.com' in s. Find the series of alphabetic chars or periods before
          the '.com' with a while loop and return the whole hostname, so 'xx
          www.foo.com xx' returns 'www.foo.com'. Return the empty string if
          there is no '.com'. This version has the added complexity of the
          periods.
        </p>
      </div>
      <div className="flex flex-row bg-stone-100">
        <AceEditor
          mode="python"
          theme="monokai"
          onChange={onChange}
          name="editor"
          editorProps={{ $blockScrolling: true }}
          style={{
            "border-radius": "8px",
            height: "24rem",
          }}
        />
      </div>
      <div className="w-80 bg-white rounded-lg p-4 h-96">
        <div className="bg-stone-200 rounded-lg w-full h-fit"></div>
      </div>
    </div>
  );
}

export default App;
