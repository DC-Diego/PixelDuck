import {UI_Component} from './UI_Component.js';

class Stepper extends UI_Component{
  constructor(root){
    super(root);
    this.input = root.querySelector('.input-stepper-js');
    this.incrementer = root.querySelector('.step-up-js');
    this.decrementer = root.querySelector('.step-down-js');

    this.on(this.incrementer, 'pointerdown',this.increment)
    this.on(this.decrementer, 'pointerdown',this.decrement)

  }

  increment = ()=>{
    this.input.stepUp();
  }
  decrement =()=>{
    this.input.stepDown();

  }


}

export { Stepper };
