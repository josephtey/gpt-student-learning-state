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
    <div className="flex flex-col">
      <h1 className="text-center font-bold">learn to code with ai!</h1>
      <div className="w-200">
        <AceEditor
          mode="python"
          theme="monokai"
          onChange={onChange}
          name="editor"
          editorProps={{ $blockScrolling: true }}
        />
      </div>
    </div>
  );
}

export default App;
