import {UI_Component} from '../UI/UI_Component.js'

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


  setNewPropertyTab(new_property){
    // props.
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
        const number = new StepperFactory(e.name, e.min, e.max, e.default, e.step, e.sensitive, true, ()=>{});
        this.#content.appendChild(number.getElement());


      }



    });






  }




}