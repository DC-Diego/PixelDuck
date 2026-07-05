import { Stepper } from "../UI/Stepper.js";

function StepperFactory(name, min, max,default_value, step, sensitive,  displayBar, changeFunction = ()=>{}){
  
  const element = document.createElement("div");
  element.classList.add("group-label-input");
  element.title = name;
  element.style.height = "30px";


  element.innerHTML = `
  <button class="icon-buttons input-ctrl step-down-js" aria-label="Decrement"><svg class="toggle-icon" viewBox="0 0 24 24"><line x1="16" y1="12" x2="8" y2="5" />
  <line x1="16" y1="12" x2="8" y2="19" /></svg>
  </button>
  <input class="input-stepper-js" type="number" min="${min}" max="${max}" value="${default_value}">
  <button class="icon-buttons input-ctrl step-up-js" aria-label="Increment"><svg class="toggle-icon rotate" viewBox="0 0 24 24"><line x1="16" y1="12" x2="8" y2="5" />
    <line x1="16" y1="12" x2="8" y2="19" /></svg>
  </button>`;
  // console.log(name, min, max,default_value, step, sensitive,  displayBar, changeFunction)

  const stepper = new Stepper(element, step, sensitive, displayBar, this.changeFunction);

  return stepper;
}

export {StepperFactory};
