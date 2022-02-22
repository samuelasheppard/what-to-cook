import { Api } from "./api.js";
import { Display } from "./display.js";

export class Input {
  constructor() {
    this._api = new Api();
    this._display = new Display();
    this.itemArray = [];
  }

  async requestJoke() {
    let joke = await this._api.getJoke();
    this._display.loadAlert(joke);
  }

  async requestRandom() {
    let recipe = await this._api.getRandom();
    this._display.displayRandomRecipe(recipe);
  }

  async requestByIngredients() {
    if (this.itemArray.length === 0) {
      this._display.loadAlert("Please enter your ingredients");
    } else {
      let recipe = await this._api.searchIngredients(this.itemArray);
      this._display.displaySearchRecipe(recipe);
    }
  }

  ingredientsContainer(item) {
    if (this.itemArray.includes(item)) {
      return;
    } else {
      this.itemArray.push(item);
      this._display.displayIngredients(this.itemArray.at(-1));
      ingredientsInput.value = "";
    }
  }

  async getRecipeId(id) {
    let recipe = await this._api.searchRecipeID(id);
    this._display.displayRandomRecipe([recipe]);
  }
}
