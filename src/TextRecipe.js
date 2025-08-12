export default class TextRecipe {
  constructor(userRecipe, testMode) {
    this.userRecipe = userRecipe
    this.testMode = testMode
  }

  async getAI() {
    const response = await puter.ai.chat(
      `Generate a strictly JSON format about a '${this.userRecipe}' cooking recipe where there are two mainly keys: ingredients and instructions. Both of them are an array of strings. You must be concise in your responses.`,
      this.testMode,
      { model: 'gemini-2.0-flash' }
    )
    return this.testMode
      ? response.message.content.text
      : response.message.content
  }
  print(objRecipe, ingredientsElement, instructionsElement) {
    ingredientsElement.innerHTML = ''
    instructionsElement.innerHTML = ''

    objRecipe.ingredients.forEach((ingredient) => {
      const li = document.createElement('li')
      li.textContent = ingredient
      ingredientsElement.appendChild(li)
    })
    objRecipe.instructions.forEach((instruction) => {
      const li = document.createElement('li')
      li.textContent = instruction
      instructionsElement.appendChild(li)
    })
  }
  isValidObject(obj) {
    if (!('ingredients' in obj) || !('instructions' in obj)) {
      return false
    }
    if (!Array.isArray(obj.ingredients) || !Array.isArray(obj.instructions)) {
      return false
    }
    const allIngredientsStrings = obj.ingredients.every(
      (item) => typeof item === 'string'
    )
    const allInstructionsStrings = obj.instructions.every(
      (item) => typeof item === 'string'
    )
    return allIngredientsStrings && allInstructionsStrings
  }
  validate(responseAI) {
    try {
      const obj = JSON.parse(responseAI)
      return this.isValidObject(obj)
    } catch (e) {
      return false
    }
  }

  clean(responseAI) {
    return responseAI.replaceAll('```', '')
  }
}
