import { ComboBox } from "../UI/ComboBox.js";

function ComboBoxFactory(name, items, changeFunction=()=>{}){
  const element = document.createElement("div");
  element.classList.add("div-toggle-reveal");
  element.classList.add("combo-js");
  element.title = name;
  element.style.width = "45%";
  element.style.height = "25px";
  element.innerHTML = `
    <h1 class="combo-text-js" style="width: 85px;"></h1>
    <button class="icon-buttons input-ctrl combo-button-js"  aria-label="${name}">
      <svg class="toggle-icon " viewBox="0 0 24 24"><line x1="16" y1="12" x2="8" y2="5" />
        <line x1="16" y1="12" x2="8" y2="19" /></svg>
    </button>
  `;

  const comboBox = new ComboBox(element, items, changeFunction);

  return comboBox;
}

export {ComboBoxFactory};
