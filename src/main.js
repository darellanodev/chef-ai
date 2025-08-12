import TextRecipe from './TextRecipe.js'

const imageElement = document.getElementById('image')
const ingredientsElement = document.getElementById('ingredients')
const instructionsElement = document.getElementById('instructions')

async function generateImageRecipe() {
  puter.ai.txt2img('A picture of a cat.', true).then((image) => {
    imageElement.appendChild(image)
  })
}
async function generateRecipe() {
  const testMode = false
  const userRecipe = 'spanish omelette'
  const textRecipe = new TextRecipe(userRecipe, testMode)
  imageElement.innerHTML = ''
  let response = await textRecipe.getAI()
  response = textRecipe.clean(response)
  if (textRecipe.validate(response)) {
    textRecipe.print(
      JSON.parse(response),
      ingredientsElement,
      instructionsElement
    )
    await generateImageRecipe()
  } else {
    resultContainer.innerHTML = 'Error, try again.'
  }
}

document
  .getElementById('generateRecipe')
  .addEventListener('click', generateRecipe)
