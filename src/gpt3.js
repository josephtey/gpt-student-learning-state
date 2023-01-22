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
