import { UI_Component } from "./UI_Component.js";

export class CheckBox extends UI_Component{


  #checkInput;
  #value;
  #callback;
  constructor(root, callback=()=>{}){
    super(root);
    this.#checkInput = root.querySelector(".check-input-js");
    this.#callback = callback;
    this.on(this.#checkInput, 'change',this.flipFlop);
  }

  flipFlop=()=>{
    this.setValue(!this.getValue());
  }

  getValue(){
    return this.#value;
  }

  setValue(v){
    this.#value = v;
    this.#checkInput.checked = v;
    this.#callback(v);
  }


}