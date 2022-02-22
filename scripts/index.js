import { Input } from "./userinput.js";

//BUTTONS
const randomButton = document.getElementById("randomRecipe");
const submitIngredients = document.getElementById("submitIngredients");
const randomJoke = document.getElementById("randomJoke");

//INPUTS
const ingredientsInput = document.getElementById("ingredientsInput");
ingredientsInput.focus();

//REQUESTS
export const _input = new Input();

//LISTENERS
randomJoke.addEventListener("click", () => {
  _input.requestJoke();
});

randomButton.addEventListener("click", () => {
  _input._display.removeDisplay("top");
  _input.requestRandom();
});

ingredientsInput.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    if (
      ingredientsInput.value.toLowerCase() == "human" ||
      ingredientsInput.value.toLowerCase() == "people" ||
      ingredientsInput.value.toLowerCase() == "person"
    ) {
      alert("I've called the police");
      ingredientsInput.value = "";
    } else if (ingredientsInput.value != "") {
      _input.ingredientsContainer(ingredientsInput.value.toLowerCase());
    } else {
      _input._display.loadAlert("Please enter your ingredients");
    }
  }
});

submitIngredients.addEventListener("click", (event) => {
  event.stopPropagation();
  _input._display.removeDisplay("top");
  _input.requestByIngredients();
});
