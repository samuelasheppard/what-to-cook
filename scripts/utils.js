import { _input } from "./index.js";

export function addNode(tag, location, text, id) {
  const newTag = document.createElement(tag);
  newTag.setAttribute("id", id);
  newTag.innerHTML = text;
  location.appendChild(newTag);
}

export function addButtonEvent(ID) {
  const node = document.getElementById(ID);
  node.addEventListener("click", () => {
    _input._display.removeDisplay("top");
    _input.getRecipeId(ID);
  });
}
