import { UI_Component } from "./UI_Component.js";

export class CheckBox extends UI_Component{


  #checkInput;
  #value;
  constructor(root){
    super(root);
    this.#checkInput = root.querySelector(".check-input-js");


  }

  flipFlop(){
    this.setValue(!this.getValue());
  }

  getValue(){
    return this.#value;
  }

  setValue(v){
    this.#value = v;
    this.#checkInput.checked = v;
  }


}