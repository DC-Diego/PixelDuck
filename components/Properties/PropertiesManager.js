import {UI_Component} from '../UI/UI_Component.js'
import { CheckBoxFactory } from './CheckBoxFactory.js';
import { ColorPickerFactory } from './ColorPickerFactory.js';
import { ComboBoxFactory } from './ComboBoxFactory.js';
import { StepperFactory } from './StepperFactory.js';


export class PropertiesManager extends UI_Component{

  #titleContainer;
  #title;
  #content;
  #propertiesDictionary = {};
  #elementsDictionary = {};
  #setPropertyService;

  constructor(root, setPropertyService){
    super(root);
    this.#titleContainer = root.querySelector(".property-title");
    this.#title = this.#titleContainer.querySelector("h1");
    this.#content = root.querySelector(".property-content");

    this.#setPropertyService = setPropertyService;
    
  }

  clearContent(){
    this.removeListeners();
    this.#content.textContent = "";

  }

  setTitle(title){
    this.#title.innerText = title;
  }

  #renderController(name, elements){
    const div = document.createElement("div");
    div.classList.add("property-container-js");
    
    const h1 = document.createElement("h1");
    h1.classList.add("property-name-js") 
    h1.innerText = `${name}:`;
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
    this.clearContent();
    if(new_property==null)return;
    this.#propertiesDictionary = {};
    this.#elementsDictionary = {};

    this.setTitle(new_property.tab_name);
    new_property.list.forEach(e => {
      this.#propertiesDictionary[e.name] = e.value;
      if(e.type=="number"){
        const stepper = new StepperFactory(e.name, e.min, e.max, e.value, e.step, e.sensitive, true, this.#changeProperties);
        this.#elementsDictionary[e.name] = stepper;
        this.#renderController(e.name, [stepper.root]);
      }else if(e.type == "combo"){
        const combo = new ComboBoxFactory(e.name, e.items, this.#changeProperties);
        this.#elementsDictionary[e.name] = combo;
        this.#renderController(e.name, [combo.root]);
      }else if(e.type == "color"){
        const color = new ColorPickerFactory(e.name, e.value,e.colorPallete, this.#changeProperties);
        this.#elementsDictionary[e.name] = color;
        this.#renderController(e.name, [color.root]);
      }else if(e.type == "checkbox"){
        const checkBox = new CheckBoxFactory(e.name, e.value, this.#changeProperties);
        this.#elementsDictionary[e.name] = checkBox;
        this.#renderController(e.name, [checkBox.root]);
      }
      
    });
    console.log(this.#propertiesDictionary)

  }

  #changeProperties = (name, value)=>{
    this.#propertiesDictionary[name] = value;
    this.#setPropertyService(this.#propertiesDictionary);

  }

  updateProperties = (props)=>{
    for (const [key, value] of Object.entries(props)) {
      this.#elementsDictionary[key].setValue(value);
      this.#propertiesDictionary[key] = value;
    }

  }


}