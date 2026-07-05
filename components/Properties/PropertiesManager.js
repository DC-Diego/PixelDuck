import { ComboBox } from '../UI/ComboBox.js';
import {UI_Component} from '../UI/UI_Component.js'
import { ComboBoxFactory } from './ComboBoxFactory.js';

import { StepperFactory } from './StepperFactory.js';


export class PropertiesManager extends UI_Component{

  #titleContainer;
  #title;
  #content;

  constructor(root){
    super(root);
    console.log(root)
    this.#titleContainer = root.querySelector(".property-title");
    this.#title = this.#titleContainer.querySelector("h1");
    this.#content = root.querySelector(".property-content");


    
  }

  clearContent(){
    this.removeListeners();
    this.#content.textContent = "";

  }

  setTitle(title){
    this.#title.innerText = title;
  }

  #renderController(name, elements){
    console.log(elements)
    const div = document.createElement("div");
    div.classList.add("property-container-js");
    
    const h1 = document.createElement("h1");
    h1.classList.add("property-name-js") 
    h1.innerText = name;
    div.appendChild(h1);
    elements.forEach(e=>{
      div.appendChild(e);

    })
   this.#content.appendChild(div); 

/*
    display: flex;
    align-items: center;
    height: 35px;
    flex-direction: row;
    justify-content: center;
    gap: 5px;
*/

  }

  setNewPropertyTab(new_property){
    // props.
    // this.#renderController("banana", ['1', !![]+ +!![]])
    const teste =    {
      tab_name: "Name",
      list: [{
        name: "Opacity",
        type: "number",
        min: 0,
        max: 1 ,
        default: 0.5
      }, {
        name: "Color",
        type: "Color",
        colorPallete: true
      },
      {
        name: "Render types",
        type: "combo",
        itens: ["item1", "item2", "item3"]

      }]
    };

    this.setTitle(new_property.tab_name);
    new_property.list.forEach(e => {
      if(e.type=="number"){
        const stepper = new StepperFactory(e.name, e.min, e.max, e.default, e.step, e.sensitive, true, ()=>{});
        // this.#content.appendChild(stepper.root);
        this.#renderController(e.name, [stepper.root]);
      }
      else if(e.type == "combo"){
        const combo = new ComboBoxFactory(e.name, e.items);
        this.#renderController(e.name, [combo.root]);
      }
      
    });






  }




}