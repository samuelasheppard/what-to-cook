import { addNode, addButtonEvent } from "./utils.js";
import { _input } from "./index.js";

export class Display {
  constructor() {
    this.id = Math.round(Math.random() * 10000000);
    this.top = document.getElementById("top");
    this.ingredientsDisplay = document.getElementById("ingredientsDisplay");
    this.root = document.getElementById("root");
  }

  loadAlert(alertText) {
    const holder = document.createElement("div");
    holder.setAttribute("id", `alert${this.id}`);
    holder.setAttribute("class", "alertSheet");
    root.appendChild(holder);
    const textElement = document.createElement("p");
    textElement.innerHTML = alertText;
    const instructions = document.createElement("small");
    instructions.innerHTML = "Click to close this window...";
    holder.appendChild(textElement);
    holder.appendChild(instructions);
    window.addEventListener("click", () => {
      this.removeDisplay(`alert${this.id}`, true);
    });
  }

  removeDisplay(id, removeSelf = false) {
    try {
      const parent = document.getElementById(id);
      let child = parent.lastElementChild;
      while (child) {
        parent.removeChild(child);
        child = parent.lastElementChild;
      }
      if (removeSelf == true) {
        parent.remove();
      }
    } catch (error) {}
  }

  displayIngredients(item, tagName = "p", classVal = "ingredientsItem") {
    const tag = document.createElement(tagName);
    tag.innerHTML = item;
    tag.setAttribute("id", item);
    tag.setAttribute("class", classVal);
    this.ingredientsDisplay.appendChild(tag);
    //CLICK TO REMOVE ITEM
    const event = document.getElementById(item);
    const index = _input.itemArray.indexOf(item);
    event.addEventListener("click", () => {
      _input.itemArray.splice(index, 1);
      this.removeDisplay(item, true);
    });
  }

  async displayRandomRecipe(recipeData) {
    for (const i of recipeData) {
      //HOLDING CONTAINER
      const container = document.createElement("div");
      container.setAttribute("class", "recipeSheet");
      this.top.appendChild(container);
      //FORMAT PARTS
      container.appendChild(this.formatTitle(i.title));
      container.appendChild(this.formatImage(i.image));
      container.appendChild(this.formatSource(i.source));
      container.appendChild(this.formatTime(i.time));
      container.appendChild(this.formatServings(i.servings));
      container.appendChild(
        this.formatIngredients(i.ingredients, "Ingredients List:")
      );
      container.appendChild(this.formatInstructions(i.instructions));
      container.appendChild(await this.formatDownload(i.id));
    }
  }

  displaySearchRecipe(recipeData) {
    for (const i of recipeData) {
      //HOLDING CONTAINER
      const container = document.createElement("div");
      container.setAttribute("class", "recipeSheet");
      this.top.appendChild(container);
      //FORMAT PARTS
      container.appendChild(this.formatTitle(i.title));
      container.appendChild(this.formatImage(i.image));
      container.appendChild(
        this.formatIngredients(
          i.missedIngredients,
          "Missing Ingredients: ",
          "missingIngredientsList"
        )
      );
      container.appendChild(
        this.formatIngredients(
          i.usedIngredients,
          "Used Ingredients: ",
          "usedIngredientsList"
        )
      );
      //VIEW RECIPE BUTTON
      addNode("button", container, "View Recipe", i.id);
      addButtonEvent(i.id);
    }
  }

  //FORMAT PARTS TO DISPLAY RECIPES
  formatTitle(title) {
    const titleTag = document.createElement("h2");
    titleTag.innerHTML = title;
    titleTag.setAttribute("id", `title${this.id}`);
    return titleTag;
  }

  formatImage(image) {
    const imageTag = document.createElement("img");
    imageTag.setAttribute("src", image);
    imageTag.setAttribute("alt", "Recipe Image");
    imageTag.setAttribute("id", `image${this.id}`);
    return imageTag;
  }

  formatSource(source) {
    const sourceTag = document.createElement("a");
    sourceTag.innerHTML = "View original recipe";
    sourceTag.setAttribute("id", `source${this.id}`);
    sourceTag.setAttribute("target", "blank");
    sourceTag.setAttribute("href", source);
    return sourceTag;
  }

  formatTime(time) {
    const timeTag = document.createElement("p");
    timeTag.innerHTML = `Prep time: ${time} mins`;
    timeTag.setAttribute("id", `time${this.id}`);
    timeTag.setAttribute("class", "highlight");
    return timeTag;
  }

  formatServings(servings) {
    const servingsTag = document.createElement("p");
    servingsTag.innerHTML = `Feeds ${servings} people`;
    servingsTag.setAttribute("id", `servings${this.id}`);
    servingsTag.setAttribute("class", "highlight");
    return servingsTag;
  }

  formatIngredients(ingredients, header, id = "ingredients", headerTag = "p") {
    const ingredientsDisplay = document.createElement("div");
    ingredientsDisplay.setAttribute("id", `${id}${this.id}`);
    ingredientsDisplay.setAttribute("class", "ingredientsContainer");
    const listTitle = document.createElement(headerTag);
    listTitle.innerHTML = header;
    listTitle.setAttribute("class", "highlight");
    ingredientsDisplay.appendChild(listTitle);
    const list = document.createElement("ul");
    ingredients.forEach((item) => {
      const listItem = document.createElement("li");
      const { unit, amount, name } = item;
      listItem.innerHTML = `${amount} ${unit} of ${name}`;
      list.appendChild(listItem);
    });
    ingredientsDisplay.appendChild(list);
    return ingredientsDisplay;
  }

  formatInstructions(instructions) {
    const instructionsTag = document.createElement("p");
    instructionsTag.innerHTML = instructions;
    instructionsTag.setAttribute("id", `instructions${this.id}`);
    return instructionsTag;
  }

  async formatDownload(id) {
    const link = document.createElement("a");
    link.setAttribute("id", `download${id}`);
    const url = await _input._api.getRecipeCard(`${id}`);
    if (url) {
      link.innerHTML = "Download";
      link.setAttribute("download", true);
      link.setAttribute("href", `${url}`);
      link.setAttribute("target", "_blank");
    } else {
      link.innerHTML = "Download Unavailable";
    }

    return link;
  }
}
