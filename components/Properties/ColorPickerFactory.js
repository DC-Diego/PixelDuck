import { ColorPicker } from "../UI/ColorPicker.js";

function ColorPickerFactory(name, color_value, colorPallete, callback=()=>{}){
  const element = document.createElement("div");
  element.classList.add("group-label-input");
  element.title = name;
  element.style.gap = "10px";

  const color = document.createElement("input");
  color.title = name;
  color.type = "color";
  color.classList.add("colorPicker");
  color.style.width="32px";
  color.value = color_value;
  element.appendChild(color);
  
  if(colorPallete){
    const text = document.createElement("h1");
    text.classList.add("action-text-js");
    text.innerText = "Color_Pallete";
    text.style.fontSize = "12px";
    text.title="color pallete";
    element.appendChild(text);
  }
  const colorPicker = new ColorPicker(element, colorPallete, (v)=>callback(name, v));
  return colorPicker;

}
export {ColorPickerFactory};