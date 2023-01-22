const { Configuration, OpenAIApi } = require("openai");

export async function callGPT3(myPrompt) {
  const configuration = new Configuration({
    apiKey: "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",
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

  return response;
}
