import RecipeDOM from './RecipeDOM.js'
import TextRecipe from './TextRecipe.js'
import ImageRecipe from './ImageRecipe.js'
import { textTestMode, imageTestMode } from './config.js'

const dom = new RecipeDOM()

async function generateRecipe() {
  dom.spinnerElement.classList.remove('hide')
  const userRecipe = dom.userRecipeElement.value
  const textRecipe = new TextRecipe(userRecipe, textTestMode)
  const imageRecipe = new ImageRecipe(userRecipe, imageTestMode)
  dom.imageElement.innerHTML = ''
  let response = await textRecipe.getAI()
  response = textRecipe.clean(response)
  if (textRecipe.validate(response)) {
    textRecipe.print(
      JSON.parse(response),
      dom.ingredientsElement,
      dom.instructionsElement
    )
    await imageRecipe.generateImageRecipe(dom.imageElement)
  } else {
    dom.errorMessage.innerHTML = 'Error, try again.'
  }
  dom.spinnerElement.classList.add('hide')
  dom.recipeCardElement.classList.remove('hide')
}

document
  .getElementById('generateRecipe')
  .addEventListener('click', generateRecipe)
