export async function callGPT3(myPrompt) {
  const response = await fetch(
    "https://us-central1-gp-learning-state.cloudfunctions.net/open-ai",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: myPrompt,
      }),
    }
  );
  const data = await response.json();

  return data.response;
}
