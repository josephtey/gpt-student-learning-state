import axios from "axios";

const db = axios.create({
  baseURL: "https://us-central1-gp-learning-state.cloudfunctions.net/",
});

export async function callGPT3(myPrompt) {
  const response = await db.post("/open-ai", {
    prompt: myPrompt,
  });

  return response.response;
}
