import TextRecipe from './TextRecipe.js'
import ImageRecipe from './ImageRecipe.js'
import { textTestMode, imageTestMode } from './config.js'

const imageElement = document.getElementById('image')
const ingredientsElement = document.getElementById('ingredients')
const instructionsElement = document.getElementById('instructions')
const errorMessage = document.getElementById('errorMessage')
const userRecipeElement = document.getElementById('userRecipe')
const spinnerElement = document.getElementById('spinner')
const recipeCardElement = document.getElementById('recipeCard')

async function generateRecipe() {
  spinnerElement.classList.remove('hide')
  const userRecipe = userRecipeElement.value
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
  spinnerElement.classList.add('hide')
  recipeCardElement.classList.remove('hide')
}

document
  .getElementById('generateRecipe')
  .addEventListener('click', generateRecipe)
