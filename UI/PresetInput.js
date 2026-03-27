import { UI_Component } from "./UI_Component.js";

class PresetInput extends UI_Component{
  
  #input; #button; #submenu; #items; #activeId;

  #UPDATER;
  
  constructor(root, items = null, updater = ()=>{}){
    super(root);

    if(items == null){
      console.error("list of items is null")
      this.destroy();
      return;
    }

    this.#input = this.root.querySelector(".combo-input-js");
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
    this.on(this.#input, 'keydown', this.#filterInput );
    this.on(this.#input, 'input',()=>{this.#UPDATER(this.getActiveValue()) });
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

  getActiveValue =()=>{
    return Number(this.#input.value);

  }

  setActiveValue = (i)=>{
    this.#input.value= Number(this.getItems(i).innerText);
  }

  #toggleSubmenu = ()=>{
    this.#button.classList.toggle("r90");
    this.#submenu.classList.toggle('active');
  }


  #itemClick = (i)=>{
    this.setActiveId(i);
    this.#toggleSubmenu();
    this.#UPDATER(this.getActiveValue());

  }

  setActiveId = (i)=>{
    this.#activeId = i;
    this.setActiveValue(i);
  }

  getActiveId = ()=>{
    return this.#activeId;
  }
  #filterInput = (e)=>{
    if((e.key < '0' ||  e.key > '9') && e.code!="Backspace" && e.code != "ArrowLeft" && e.code != "ArrowRight")   e.preventDefault();
    
  } 

}



export {PresetInput}