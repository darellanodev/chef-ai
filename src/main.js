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
  let response = await textRecipe.getAI();
  response = textRecipe.clean(response);
  if (textRecipe.validate(response)) {
    textRecipe.print(response);
    await generateImageRecipe();
  } else {
    resultContainer.innerHTML = "Error, try again.";
  }
}

document
  .getElementById("generateRecipe")
  .addEventListener("click", generateRecipe);
