export default class TextRecipe {
  constructor(resultContainer) {
    this.resultContainer = resultContainer;
  }

  async getAI() {
    const testMode = false;
    const userRecipe = "spanish omelette";
    const chat_resp = await puter.ai.chat(
      `Generate a strictly JSON format about a '${userRecipe}' cooking recipe where there are two mainly keys: ingredients and instructions. Both of them are an array of strings. You must be concise in your responses.`,
      testMode,
      { model: "gemini-2.0-flash" }
    );
    console.log(chat_resp);
    let response = testMode
      ? chat_resp.message.content[0].text
      : chat_resp.message.content;
    this.resultContainer.innerHTML += response.replaceAll("\n", "<br>");
  }
}
