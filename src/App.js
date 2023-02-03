import "semantic-ui-css/semantic.min.css";
import { useState } from "react";
import "./App.css";
import { callGPT3 } from "./gpt3";
import AceEditor from "react-ace";
import { addHint, updateEvaluation } from "./utils";
import Swal from "sweetalert2";
import ReactLoading from "react-loading";
import { Dropdown } from "semantic-ui-react";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
const problems = [
  {
    text: "fancy_at",
    starter_code: `def fancy_at(s):
    pass`,
    value: `Given string s. Return the string with '@@' added at its beginning and end. Unless the string is length 3 or less, then add a more modest '@' at both ends.`,
  },
  {
    text: "odo",
    starter_code: `def odo(s):
    pass`,
    value: `Given string s. If the first and third chars in the string are the same, then return a version of the string with that char added at the beginning and end of the string. Otherwise, of if the string is too short, return the string unchanged.`,
  },
  {
    text: "cab_code",
    starter_code: `def cab_code(s):
    pass`,
    value: `Given string s. If the string is length 3, return a version of the string with the three chars changed according to the "cab" code. This just switches the order of the three chars, so 'abc' becomes 'cab'. If the string is not length 3, return it unchanged.`,
  },
  {
    text: "Red Channel",
    starter_code: `def red_channel(filename):
    image = SimpleImage(filename)
    for pixel in image:
        pixel.green = pixel.green * 0.5
        pixel.blue = pixel.blue * 0.5
        pixel.red = pixel.red * 0.5
        # or shorthand form:
        # pixel.red *= 0.5
    return image`,
    value: `Load the image for the given filename. Change the image as follows: For every pixel, set the green and blue values to 0. This switches off all the green and blue lights, leaving only the red lights, aka the red channel. Return the changed image.`,
  },
  {
    text: "Darker",
    starter_code: `def darker(filename):
    image = SimpleImage(filename)
    for pixel in image:
        pixel.green = 0
        pixel.blue = 0
    return image`,
    value: `Load the image for the given filename. Make the image darker by halving the red, green, and blue values. Return the changed image.`,
  },
  {
    text: "Copper Puzzle",
    starter_code: `def solve_copper(filename):
    image = SimpleImage(filename)
    for pixel in image:
        pass # your code here
    return image`,
    value: `The copper puzzle: a picture of something famous is hidden in the input image. The red values are all meaningless noise, and should be set to 0. The green and blue values are 10x smaller than the correct values. Write code to fix the image. Return the fixed image.`,
  },
  {
    text: "Banana 5-10-20 Puzzle",
    starter_code: `def solve_banana(filename):
    image = SimpleImage(filename)
    for pixel in image:
        pass # your code here
    return image`,
    value: `Fix the 5-10-20 puzzle image of a banana sitting on red bricks. The red, green, and blue values are 5, 10, and 20 times too small. Figure out which color goes with which factor.`,
  },
  {
    text: "Iron Puzzle",
    starter_code: `def solve_iron(filename):
    image = SimpleImage(filename)
    pass # your code here
    return image`,
    value: `A picture of a famous iron object is hidden in the input image. In the input image, the red and green values are meaningless noise, appearing as little dots. The blue value of each input pixel is 1/5 of its correct value. The correct red and green values are simply the same as the blue value. So if a pixel's correct blue is 220, then its red and green should also be 220. Write code to fix the problems in the input image and return it, revealing the iron object. The resulting image will be grayscale, since when a pixel's red, green, and blue values are all equal, that pixel is a shade of gray.`,
  },
  {
    text: "Watermelon 5-10-20 Puzzle",
    starter_code: `def solve_melon(filename):
    image = SimpleImage(filename)

    pass # your code here

    return image`,
    value: `The input is a 5-10-20 puzzle image of a watermelon sitting on a tan cutting board. Write code to fix the image and return it. Figure out which factor goes with which color by experimentation.`,
  },
  {
    text: "Darker Nested",
    starter_code: `def darker(filename):
    image = SimpleImage(filename)
    for y in range(image.height):
        for x in range(image.width):
            pixel = image.get_pixel(x, y)
            pixel.red *= 0.5
            pixel.green *= 0.5
            pixel.blue *= 0.5
    return image`,
    value: `Use nested range loops to modify the original image. Make all the pixels darker by multiplying the red/green/blue values by 0.5. Return the modified image.`,
  },
  {
    text: "Darker Out",
    starter_code: `def darker(filename):
    image = SimpleImage(filename)
    # Create out image, same size as original
    out = SimpleImage.blank(image.width, image.height)
    for y in range(image.height):
        for x in range(image.width):
            pixel = image.get_pixel(x, y)
            # Key: set data into pixel in *out image*
            pixel_out = out.get_pixel(x, y)
            pixel_out.red = pixel.red * 0.5
            pixel_out.green = pixel.green * 0.5
            pixel_out.blue = pixel.blue * 0.5
    return out`,
    value: `Create a new "out" image the same size as the original image. Set darker versions of every pixel into the out image, multiplying the red/green/blue values by 0.5. Return the out image. This demonstates having a separate out image and nested loops.`,
  },
  {
    text: "Green Channel Nested",
    starter_code: `def green_channel(filename):
    image = SimpleImage(filename)
    pass`,
    value: `Create a new out image the same size as the original image. Write nested loop code to set the green channel of the original image into the out image. Do this by copying the green values, and setting red and blue values to 0 for each pixel in the out image. Return the out image.`,
  },
  {
    text: "Darker Left",
    starter_code: `def darker_left(filename):
    image = SimpleImage(filename)
    pass
    return image`,
    value: `The "left" parameter is an int value, ranging from zero to the width of the original image. Modify the original image by darkening a stripe "left" pixels width down its left side. Darken each pixel by multiplying the red/green/blue values by 0.5. Return the modified image. (This problem uses an int parameter, but not a separate out image.)`,
  },
  {
    text: "Copy Left",
    starter_code: `def copy_left(filename):
    image = SimpleImage(filename)
    pass`,
    value: `Create a new out image the same size as the original image. The "left" parameter is an int value, ranging from zero to the original image width. Copy a stripe "left" pixels wide from the left side of the original image to the out image. So if left is 10, copy a 10 pixel wide stripe. Return the out image.`,
  },
  {
    text: "image shift",
    starter_code: ``,
    value:
      "Create an out image 10 pixels wider than the original. (1) Set an aqua colored vertical stripe 10 pixels wide at the left by setting red to 0, leaving green and blue at 255. (2) Copy the original image just to the right of the aqua stripe. Return the computed out image.",
  },
  {
    text: "Aqua 10",
    starter_code: `def aqua_stripe(filename):
    image = SimpleImage(filename)
    pass`,
    value: `Create an out image 10 pixels wider than the original. (1) Set an aqua colored vertical stripe 10 pixels wide at the left by setting red to 0, leaving green and blue at 255. (2) Copy the original image just to the right of the aqua stripe. Return the computed out image.`,
  },
  {
    text: "Aqua N",
    starter_code: `def aqua_stripe(filename):
    image = SimpleImage(filename)
    pass`,
    value: `The "n" parameter is an int value, zero or more. The code in the function should use whatever value is in n. (Values of n appear in the Cases menu.) Create an out image n pixels wider than the original. (1) Set an aqua colored vertical stripe n pixels wide at the left by setting red to 0, leaving green and blue at 255. (2) Copy the original image just to the right of the aqua stripe. Return the computed out image.`,
  },
  {
    text: "Side N",
    starter_code: `def side_n(filename):
    image = SimpleImage(filename)
    pass`,
    value: `The "n" parameter is an int value, zero or more. The code in the function should use whatever value is in n. (Values of n appear in the Cases menu.)

    Create an out image with a copy of the original image with n-pixel-wide blank areas added on its left and right sides. Return the out image.`,
  },
  {
    text: "Mirror1",
    starter_code: `def mirror1(filename):
    image = SimpleImage(filename)
    # Create an out image twice as wide as the original.
    out = SimpleImage.blank(image.width * 2, image.height)
    for y in range(image.height):
        for x in range(image.width):
            pixel = image.get_pixel(x, y)
            # left copy
            pixel_left = out.get_pixel(x, y)
            pixel_left.red = pixel.red
            pixel_left.green = pixel.green
            pixel_left.blue = pixel.blue
            # right copy
            # nothing!
    return out`,
    value: `Read the original image at the given filename. Create a new "out" image twice as wide as the original. Copy the original image to the left half of out, leaving the right half blank. Return the out image (this is a halfway-point to the mirror2 problem).`,
  },
  {
    text: "Mirror2",
    starter_code: `def mirror2(filename):
    image = SimpleImage(filename)
    out = SimpleImage.blank(image.width * 2, image.height)
    for y in range(image.height):
        for x in range(image.width):
            pixel = image.get_pixel(x, y)
                # left copy
                pixel_left = out.get_pixel(x, y)
                pixel_left.red = pixel.red
                pixel_left.green = pixel.green
                pixel_left.blue = pixel.blue
                # right copy
                # this is the key spot
                # have: pixel at x,y in image
                # want: pixel_right at ??? to write to
                pass
        return out`,
    value: `Like mirror1, but also copy the original image to the right half of "out" as a horizontally flipped mirror image. Return the out image. Starter code does the left half, right half TBD.`,
  },
  {
    text: "Mirror3",
    starter_code: `def mirror3(filename):
    image = SimpleImage(filename)
    out = SimpleImage.blank(image.width * 2, image.height)
    pass
    
    return out`,
    value: `Create and return an out image twice as wide as the original image. Copy to the out image two, side by side copies of the original image with the left copy vertically flipped upside down.`,
  },
];

const evals = ["No", "Not really", "Kinda", "Yes"];
const test = `def fancy_at(s):
                  pass`;
function App() {
  const [currentCode, setCurrentCode] = useState(problems[0].starter_code);
  const [gptResponses, setGptResponses] = useState([]);
  const [isGettingHelp, setIsGettingHelp] = useState(false);
  const [isRunningCode, setIsRunningCode] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(problems[0].value);
  const [output, setOutput] = useState(null);

  const generateContext = (code) => {
    return `
      You are a CS instructor teaching students introductory programming. 
      Your students will provide you a question, and then their answer. 
      Your task is to provide them a hint that doesn't give them the exact solution but helps them identify the issue they're having and help them get unstuck. 
      
      Here is my coding problem: 
      ${selectedProblem}

      Here is my code: 
      ${code}

      This isn't working. Can you give me a hint? 
      `;
  };
  const generateHint = async (code) => {
    setIsGettingHelp(true);
    const context = generateContext(code);
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
    <div className="flex flex-row h-screen pt-32 gap-4 justify-center bg-stone-100">
      <div
        className="w-80 bg-white ml-5 rounded-lg p-4"
        style={{ height: "75%" }}
      >
        <Dropdown
          placeholder="Select Problem"
          fluid
          search
          selection
          value={selectedProblem}
          onChange={(e, data) => {
            setSelectedProblem(data.value);
            setCurrentCode(
              problems[problems.findIndex(({ value }) => value == data.value)]
                .starter_code
            );
          }}
          options={problems}
        />
        <div className="mt-5">
          <b>Coding Problem:</b>
          <p>{selectedProblem}</p>
        </div>
      </div>
      <div className="flex flex-col bg-stone-100 gap-3">
        <AceEditor
          id="editor"
          mode="python"
          theme="monokai"
          onChange={onChange}
          name="editor"
          value={currentCode}
          editorProps={{ $blockScrolling: true }}
          style={{
            "border-radius": "8px",
            height: "50.5%",
          }}
        />
        <div className="flex flex-row gap-3">
          <button
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
                height={"10%"}
                width={"10%"}
              />
            ) : (
              <>Get Help!</>
            )}
          </button>
        </div>

        <div
          className="rounded-lg bg-black text-white p-4 overflow-auto w-full"
          style={{
            height: "16%",
          }}
        >
          {output?.split("\n").map((line) => {
            return <div>{line}</div>;
          })}
        </div>
      </div>
      <div
        className="w-80 bg-white rounded-lg p-4 flex flex-col gap-4"
        style={{ height: "75%" }}
      >
        {gptResponses.length > 0 ? (
          <div style={{ height: "50px" }}>
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
  );
}

export default App;
