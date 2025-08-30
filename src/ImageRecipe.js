export default class ImageRecipe {
  constructor(userRecipe, testMode) {
    this.userRecipe = userRecipe
    this.testMode = testMode
  }
  async generateImageRecipe(imageElement) {
    puter.ai
      .txt2img(`A picture of a recipe for a ${this.userRecipe}.`, this.testMode)
      .then((image) => {
        imageElement.appendChild(image)
      })
  }
}
