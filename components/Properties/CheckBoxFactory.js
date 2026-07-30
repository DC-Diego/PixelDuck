import { CheckBox } from "../UI/CheckBox.js";


function CheckBoxFactory(name, value, callback){
  const element = document.createElement("div");
  element.classList.add("group-label-input");
  element.style.height = "25px";
  element.style.minWidth = "44%";
  element.style.gap = "10px";
  element.title = name;

  const input = document.createElement("input");
  input.classList.add("check-input-js");
  input.type  = "checkbox";
  input.style.width = "auto";
  input.style.margin = "0";

  const h1 = document.createElement("h1");
  h1.innerText = name;
  h1.style.fontSize = "12px";
  h1.style.margin = "0";

  element.appendChild(input);
  element.appendChild(h1);
  const checkBox = new CheckBox(element, (v)=>callback(name, v));
  checkBox.setValue(value);
  return checkBox; 

}


export {CheckBoxFactory};