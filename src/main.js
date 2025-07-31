const resultContainer = document.getElementById("result");

async function generateTextRecipe() {
  const chat_resp = await puter.ai.chat(
    "Generate a recipe of spanish omelette",
    true,
    { model: "gemini-2.0-flash", stream: true }
  );
  resultContainer.innerHTML = "<h1>Gemini 2.0 Flash:</h1>";
  for await (const part of chat_resp) {
    resultContainer.innerHTML += part?.text?.replaceAll("\n", "<br>");
  }
}

async function generateImageRecipe() {
  puter.ai.txt2img("A picture of a cat.", true).then((image) => {
    resultContainer.appendChild(image);
  });
}
async function generateRecipe() {
  resultContainer.innerHTML = "";
  await generateTextRecipe();
  await generateImageRecipe();
}

document
  .getElementById("generateRecipe")
  .addEventListener("click", generateRecipe);
