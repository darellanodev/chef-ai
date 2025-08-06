export default class TextRecipe {
  constructor(resultContainer, userRecipe, testMode) {
    this.resultContainer = resultContainer;
    this.userRecipe = userRecipe;
    this.testMode = testMode;
  }

  async getAI() {
    return await puter.ai.chat(
      `Generate a strictly JSON format about a '${this.userRecipe}' cooking recipe where there are two mainly keys: ingredients and instructions. Both of them are an array of strings. You must be concise in your responses.`,
      this.testMode,
      { model: "gemini-2.0-flash" }
    );
  }
  print(result) {
    let response = this.testMode
      ? result.message.content[0].text
      : result.message.content;
    this.resultContainer.innerHTML += response.replaceAll("\n", "<br>");
  }
  isValidObject(obj) {
    if (!("ingredients" in obj) || !("instructions" in obj)) {
      return false;
    }
    if (!Array.isArray(obj.ingredients) || !Array.isArray(obj.instructions)) {
      return false;
    }
    const allIngredientsStrings = obj.ingredients.every(
      (item) => typeof item === "string"
    );
    const allInstructionsStrings = obj.instructions.every(
      (item) => typeof item === "string"
    );
    return allIngredientsStrings && allInstructionsStrings;
  }
  validate(responseAI) {
    try {
      const obj = JSON.parse(responseAI);
      return this.isValidObject(obj);
    } catch (e) {
      return false;
    }
  }
}
