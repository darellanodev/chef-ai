import TextRecipe from "./TextRecipe.js";

const resultContainer = document.getElementById("result");

async function generateImageRecipe() {
  puter.ai.txt2img("A picture of a cat.", true).then((image) => {
    resultContainer.appendChild(image);
  });
}
async function generateRecipe() {
  const textRecipe = new TextRecipe(resultContainer);
  resultContainer.innerHTML = "";
  await textRecipe.getAI();
  await generateImageRecipe();
}

document
  .getElementById("generateRecipe")
  .addEventListener("click", generateRecipe);
