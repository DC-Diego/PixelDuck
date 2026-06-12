import { UI_Component } from "./UI_Component.js";
import { ContextMenu } from "./ContextMenu.js";

export class TabView extends UI_Component{

  #tabSelector;
  #tabContent;
  #otherTabs;
  #tabArea;
  #tabOptions;
  constructor(root){
    super(root);
    this.#tabSelector = root.querySelector(".tabSelector");
    this.#tabContent = root.querySelector(".tabContent");
    this.#tabArea = document.createElement("div");
    this.#tabOptions = document.createElement("div");
    this.#tabArea.classList.add("tabArea");
    this.#tabOptions.classList.add("tabOptions");


    this.#otherTabs = new ContextMenu(this.#tabOptions, ["item 1","item 2","item 3"], {translateX: "-100%", translateY: "35px"}, this.activeTabService);
    this.#tabSelector.appendChild(this.#tabArea);
    this.#tabSelector.appendChild(this.#tabOptions);
    this.on(this.#tabOptions, "pointerdown", this.#otherTabs.toggleSubmenu);

  }

  activeTabService=(i)=>{
    this.setActiveTab(i);

  }

  setActiveTab = (i)=>{
    this.#tabArea.innerHTML =  `<div> <h1>${i}</h1></div>`;
    this.#tabContent.innerHTML = `<div> <h1>${i}</h1></div>`; 


  }


}