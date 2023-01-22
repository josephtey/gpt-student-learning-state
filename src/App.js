import { useEffect } from "react";
import "./App.css";
import { callGPT3 } from "./gpt3";
import AceEditor from "react-ace";

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
    <div className="flex">
      <p className="text-center">Hello</p>
      <AceEditor
        mode="java"
        theme="github"
        onChange={onChange}
        name="editor"
        editorProps={{ $blockScrolling: true }}
      />
      ,
    </div>
  );
}

export default App;
