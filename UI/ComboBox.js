import { UI_Component } from "./UI_Component.js";

class ComboBox extends UI_Component{
  
  #text; #button; #submenu; #items; #activeId; #UPDATER;
  
  constructor(root, items = null, updater = ()=>{}){
    super(root);

    if(items == null){
      console.error("list of items is null")
      this.destroy();
      return;
    }


    this.#text = this.root.querySelector(".combo-text-js");
    this.#button = this.root.querySelector(".combo-button-js");
    this.#submenu = document.createElement("div");
    this.#items = [];
    this.#activeId = 0;
    this.#UPDATER = updater;
    
    this.root.appendChild(this.#submenu);
    this.#submenu.classList.add("submenu-combo-js");

    this.#init(items);
    this.setActiveId(0);

    this.on(this.#button, 'pointerdown', this.#toggleSubmenu);
  }


  #init = (array)=>{
    for (let i = 0; i < array.length; i++){
      const s = document.createElement("span");
      s.innerText=`${array[i]}`;
      this.#submenu.appendChild(s);
      this.#items.push(s);
      this.on(s,'pointerdown', ()=>{this.#itemClick(i)});
    }

  }

  getItems = (i)=>{
    return this.#items[i];

  }

  getActiveText = ()=>{
    return this.getItems(this.#activeId).innerText;

  }

  setActiveText = (i)=>{
    this.#text.innerText=`${this.getItems(i).innerText}`;
  }

  #toggleSubmenu = ()=>{
    this.#button.classList.toggle("r90");
    this.#submenu.classList.toggle('active');
  }


  #itemClick = (i)=>{
    this.setActiveId(i)
    this.#toggleSubmenu();
    this.#UPDATER(i);
  }

  setActiveId = (i)=>{
    this.#activeId = i;
    this.setActiveText(i);

  }

  getActiveId = ()=>{
    return this.#activeId;
  }
  
}



export {ComboBox}