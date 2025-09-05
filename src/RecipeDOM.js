export default class RecipeDOM {
  constructor() {
    this.imageElement = document.getElementById('image')
    this.ingredientsElement = document.getElementById('ingredients')
    this.instructionsElement = document.getElementById('instructions')
    this.errorMessage = document.getElementById('errorMessage')
    this.userRecipeElement = document.getElementById('userRecipe')
    this.spinnerElement = document.getElementById('spinner')
    this.recipeCardElement = document.getElementById('recipeCard')
  }
}
