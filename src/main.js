const resultContainer = document.getElementById("result");

async function generateRecipe() {
  resultContainer.innerHTML = "";
  // Generate text with Gemini 2.0 Flash
  const chat_resp = await puter.ai.chat(
    "Generate a recipe of spanish omelette",
    true,
    { model: "gemini-2.0-flash", stream: true }
  );
  resultContainer.innerHTML = "<h1>Gemini 2.0 Flash:</h1>";
  for await (const part of chat_resp) {
    resultContainer.innerHTML += part?.text?.replaceAll("\n", "<br>");
  }

  // Generate image with DALL-E 3
  puter.ai.txt2img("A picture of a cat.", true).then((image) => {
    resultContainer.appendChild(image);
  });
}

document
  .getElementById("generateRecipe")
  .addEventListener("click", generateRecipe);
