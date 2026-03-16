import {UI_Component} from './UI_Component.js';

class Stepper extends UI_Component{
  #input; #incrementer; #decrementer; #infos; #displayBar;
  constructor(root, step = 1, sensitivy,displayBar = false){
    super(root);
    this.#input = root.querySelector('.input-stepper-js');
    this.#incrementer = root.querySelector('.step-up-js');
    this.#decrementer = root.querySelector('.step-down-js');
    this.#displayBar = displayBar;



    this.#infos = {
      min: Number(this.#input.min),
      max: Number(this.#input.max),
      step: step,
      sensitivy: sensitivy
    }

    
    this.on(this.#incrementer, 'pointerdown',()=>this.#increment(this.#infos.step))
    this.on(this.#decrementer, 'pointerdown',()=>this.#decrement(this.#infos.step))
    this.on(this.#input, 'keydown', this.#filterInput );
    this.on(this.#input, 'blur', this.#fixInput );
    
    let isPressing = false;

    this.on(this.#input, 'pointerdown', (e)=>{
      isPressing = true;
      this.#input.requestPointerLock();
    });
    
    this.on(document, 'pointermove', (e)=>{
      if(isPressing){
        const dx = e.movementX*sensitivy;
        if(dx < 0) this.#decrement(Math.abs(dx));
        if(dx > 0) this.#increment(dx);
      }
    });
    
    this.on(document, 'pointerup', (e)=>{ 
      isPressing = false;
      document.exitPointerLock();
    });
    
    if(this.#displayBar) this.#progressbar(Number(this.#input.value));
  }

  #increment = (steps)=>{
    this.#input.stepUp(steps);
    if(this.#displayBar) this.#progressbar(Number(this.#input.value));
  }
  #decrement =(steps)=>{
    this.#input.stepDown(steps);
    if(this.#displayBar) this.#progressbar(Number(this.#input.value));
  }

  #filterInput = (e)=>{
    if((e.key < '0' ||  e.key > '9') && e.code!="Backspace") e.preventDefault();
  } 
  #fixInput = (e)=>{
    let value = Number(this.#input.value);
    if(value < this.#infos.min){
      this.#increment(this.#infos.step);
    } 
    if(value > this.#infos.max){
      this.#decrement(this.#infos.step);

    } 
  }

  #progressbar = (v)=>{
    let clampMax = this.#infos.max -this.#infos.min;
    let clampValue = v -this.#infos.min;
    let percent = clampValue/clampMax;

    this.root.style.background = `linear-gradient(90deg, #2b21b6 ${Math.round(percent*100)}%, #3d3d3d ${Math.round(percent*100)}%)`


  }


}

export { Stepper };
