// export async function callGPT3(myPrompt) {
//   const response = await fetch(
//     "https://us-central1-gp-learning-state.cloudfunctions.net/open-ai",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         prompt: myPrompt,
//       }),
//     }
//   );
//   const data = await response.json();

//   return data.response;
// }

const { Configuration, OpenAIApi } = require("openai");
const secretKey = process.env.REACT_APP_OPENAI_API_KEY;

export async function callGPT3(myPrompt) {
  const configuration = new Configuration({
    apiKey: secretKey,
  });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: myPrompt,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.data.choices[0].text;
}
