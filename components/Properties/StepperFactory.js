import { Stepper } from "../UI/Stepper.js";

export class StepperFactory{


  #element;
  #Stepper;
  constructor(name, min, max,default_value, step, sensitive,  displayBar, changeFunction = ()=>{}){

    this.#element = document.createElement("div");
    this.#element.classList.add("group-label-input");
    this.#element.title = name;
    this.#element.style.height = "30px";


    this.#element.innerHTML = `
    <button class="icon-buttons input-ctrl step-down-js" aria-label="Decrement"><svg class="toggle-icon" viewBox="0 0 24 24"><line x1="16" y1="12" x2="8" y2="5" />
    <line x1="16" y1="12" x2="8" y2="19" /></svg>
    </button>
    <input class="input-stepper-js" type="number" min="${min}" max="${max}" value="${default_value}">
    <button class="icon-buttons input-ctrl step-up-js" aria-label="Increment"><svg class="toggle-icon rotate" viewBox="0 0 24 24"><line x1="16" y1="12" x2="8" y2="5" />
      <line x1="16" y1="12" x2="8" y2="19" /></svg>
    </button>`;
    console.log(name, min, max,default_value, step, sensitive,  displayBar, changeFunction)

    this.#Stepper = new Stepper(this.#element, step, sensitive, displayBar, this.changeFunction);

    // const element =  `<div class="group-label-input"  title="${name}">
      
    // </div>`




  }

  changeFunction = (v)=>{
    // console.log(v)
    this.#Stepper.setValue(v)


  }


  getElement(){ return this.#element;}
  getStepper(){ return this.#Stepper;}

}