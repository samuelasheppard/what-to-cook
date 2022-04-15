export class Api {
  constructor() {
    this.key = "4908b6a9cb05447eb3b95661f4521766";
    //https://api.spoonacular.com/food/products/search?query=yogurt&apiKey=API-KEY
  }

  async getRandom() {
    try {
      const url = `https://api.spoonacular.com/recipes/random?number=5&apiKey=${this.key}`;
      const recipes = await axios.get(url);
      return this.splitRandomRecipe(recipes.data);
    } catch (error) {}
  }

  async searchIngredients(ingredients) {
    const holder = ingredients.join(",+");

    try {
      const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${holder}&number=10&ranking=2&ignorePantry=true&sort=min-missing-ingredients&apiKey=${this.key}`;
      const recipes = await axios.get(url);
      return this.splitSearchRecipe(recipes.data);
    } catch (error) {}
  }

  async searchRecipeID(id) {
    try {
      const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${this.key}`;
      const recipes = await axios.get(url);
      return this.splitData(recipes.data);
    } catch (error) {}
  }

  async getJoke() {
    try {
      const url = `https://api.spoonacular.com/food/jokes/random?apiKey=${this.key}`;
      const joke = await axios.get(url);
      return joke.data.text;
    } catch (error) {}
  }

  async getRecipeCard(id) {
    try {
      const url = `https://api.spoonacular.com/recipes/${id}/card?apiKey=${this.key}`;
      const card = await axios.get(url);
      return card.data.url;
    } catch (error) {}
  }

  splitData(recipe) {
    return {
      title: recipe.title,
      image: recipe.image,
      source: recipe.sourceUrl,
      time: recipe.readyInMinutes,
      servings: recipe.servings,
      ingredients: recipe.extendedIngredients,
      instructions: recipe.instructions,
      id: recipe.id,
    };
  }

  splitRandomRecipe(recipeObject) {
    const recipeArray = [];
    recipeObject.recipes.forEach((i) => {
      recipeArray.push(this.splitData(i));
    });
    return recipeArray;
  }

  splitSearchRecipe(recipeArray) {
    const recipes = [];
    recipeArray.forEach((i) => {
      const splitRecipe = {
        title: i.title,
        image: i.image,
        missedIngredients: i.missedIngredients,
        usedIngredients: i.usedIngredients,
        id: i.id,
      };
      recipes.push(splitRecipe);
    });
    return recipes;
  }
}
