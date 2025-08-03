import TextRecipe from "./TextRecipe.js";

const resultContainer = document.getElementById("result");

async function generateImageRecipe() {
  puter.ai.txt2img("A picture of a cat.", true).then((image) => {
    resultContainer.appendChild(image);
  });
}
async function generateRecipe() {
  const testMode = false;
  const userRecipe = "spanish omelette";
  const textRecipe = new TextRecipe(resultContainer, userRecipe, testMode);
  resultContainer.innerHTML = "";
  const response = await textRecipe.getAI();
  textRecipe.print(response);
  await generateImageRecipe();
}

document
  .getElementById("generateRecipe")
  .addEventListener("click", generateRecipe);
