import TextRecipe from './TextRecipe.js'
import ImageRecipe from './ImageRecipe.js'

const imageElement = document.getElementById('image')
const ingredientsElement = document.getElementById('ingredients')
const instructionsElement = document.getElementById('instructions')
const errorMessage = document.getElementById('errorMessage')

async function generateRecipe() {
  const textTestMode = false
  const imageTestMode = true
  const userRecipe = 'spanish omelette'
  const textRecipe = new TextRecipe(userRecipe, textTestMode)
  const imageRecipe = new ImageRecipe(userRecipe, imageTestMode)
  imageElement.innerHTML = ''
  let response = await textRecipe.getAI()
  response = textRecipe.clean(response)
  if (textRecipe.validate(response)) {
    textRecipe.print(
      JSON.parse(response),
      ingredientsElement,
      instructionsElement
    )
    await imageRecipe.generateImageRecipe(imageElement)
  } else {
    errorMessage.innerHTML = 'Error, try again.'
  }
}

document
  .getElementById('generateRecipe')
  .addEventListener('click', generateRecipe)
