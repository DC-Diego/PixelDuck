import { UI_Component } from "./UI_Component.js";

export class ContextMenu extends UI_Component{
    
  #submenu; #items; #activeId; #UPDATER;
  
  constructor(root, items = null, renderOptions,updater = ()=>{}){
    super(root);

    if(items == null){
      console.error("list of items is null")
      this.destroy();
      return;
    }


    this.#submenu = document.createElement("div");
    this.#items = [];
    this.#activeId = 0;
    this.#UPDATER = updater;
    
    this.root.appendChild(this.#submenu);
    this.#submenu.classList.add("submenu-context-js");
    this.#submenu.style.translate = `${renderOptions.translateX} ${renderOptions.translateY}`;

    this.#init(items);
    this.setActiveId(0);

  }

  toggleSubmenu = ()=>{
    console.log("EREERRE")
    this.#submenu.classList.toggle('active');
  }

  #init = (array)=>{
    for (let i = 0; i < array.length; i++){
      const s = document.createElement("span");
      s.innerText=`${array[i]}`;
      this.#submenu.appendChild(s);
      this.#items.push(s);
      this.on(s,'pointerdown', (e)=>{
        e.stopPropagation();
        this.#itemClick(i)
      });
    }

  }

  getItems = (i)=>{
    return this.#items[i];

  }

  getActiveText = ()=>{
    return this.getItems(this.#activeId).innerText;

  }


  #itemClick = (i)=>{

    console.log(i)
    this.setActiveId(i)
    this.#UPDATER(i);
    this.toggleSubmenu();
  }

  setActiveId = (i)=>{
    this.#activeId = i;
   
  }

  getActiveId = ()=>{
    return this.#activeId;
  }
  
  
  
  

} 