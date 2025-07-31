const resultContainer = document.getElementById("result");

async function generateTextRecipe() {
  const testMode = true;
  const chat_resp = await puter.ai.chat(
    "Generate a recipe of spanish omelette",
    testMode,
    { model: "gemini-2.0-flash" }
  );
  console.log(chat_resp);
  let response = testMode
    ? chat_resp.message.content[0].text
    : chat_resp.message.content;
  resultContainer.innerHTML += response.replaceAll("\n", "<br>");
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
