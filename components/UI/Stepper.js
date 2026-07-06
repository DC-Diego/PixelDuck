import {UI_Component} from './UI_Component.js';

class Stepper extends UI_Component{
  #input; #incrementer; #decrementer; #infos; #displayBar; #UPDATER; #value;
 
  constructor(root, step = 1, sensitivy,displayBar = false, onChange = ()=>{}){
    super(root);
    this.#input = root.querySelector('.input-stepper-js');
    this.#incrementer = root.querySelector('.step-up-js');
    this.#decrementer = root.querySelector('.step-down-js');
    this.#displayBar = displayBar;
    this.#UPDATER=onChange;
    this.#value=0;


    this.#infos = {
      min: Number(this.#input.min),
      max: Number(this.#input.max),
      step: step,
      sensitivy: sensitivy
    }

    this.#input.step = step;
    
    if(this.#incrementer) this.on(this.#incrementer, 'pointerdown',()=>this.#increment(1))
    if(this.#decrementer) this.on(this.#decrementer, 'pointerdown',()=>this.#decrement(1))

    this.on(this.#input, 'keydown', this.#filterInput );
    this.on(this.#input, 'blur', this.#fixInput );
    this.on(this.#input, 'change', this.#change);
    
    let isPressing = false;

    this.on(this.#input, 'pointerdown', (e)=>{
      isPressing = true;
      this.#input.requestPointerLock();
    });
    
    this.on(document, 'pointermove', (e)=>{
      if(isPressing){
        const dx = e.movementX*sensitivy;
        if(dx < 0) this.#decrement(Math.max(Math.abs(dx),1));
        if(dx > 0) this.#increment(Math.max(dx,1));
      }
    });
    
    this.on(document, 'pointerup', (e)=>{ 
      isPressing = false;
      document.exitPointerLock();
    });
    
    if(this.#displayBar) this.#progressbar(Number(this.#input.value));
  }

  #change=()=>{
    this.#UPDATER(Number(this.#input.value));
  }

  setValue = (v)=>{
    this.#input.value = v;
    this.#value = v;
    if(this.#displayBar) this.#progressbar(Number(this.#input.value));
    this.#fixInput(v);
  } 

  getValue = ()=>{
    return this.#value;
  }

  setMaxInput = (max)=>{
    if(max < this.#infos.min) max = this.#infos.min;
    this.#input.max = max;
    this.#infos.max = max;
  }

  #increment = (steps)=>{
    this.#input.stepUp(steps);
    this.#value = Number(this.#input.value);
    if(this.#displayBar) this.#progressbar(Number(this.#input.value));
    this.#change();
  }
  #decrement =(steps)=>{
    this.#input.stepDown(steps);
    this.#value = Number(this.#input.value);
    if(this.#displayBar) this.#progressbar(Number(this.#input.value));
    this.#change();
  }

  #filterInput = (e)=>{
    if((e.key < '0' ||  e.key > '9') && e.code!="Backspace" && e.code != "ArrowLeft" && e.code != "ArrowRight") e.preventDefault();
  } 
  #fixInput = (e)=>{
    let value = Number(this.#input.value);
    if(value < this.#infos.min){
      this.#increment(this.#infos.step);
    } 
    if(value > this.#infos.max){
      this.#decrement(this.#infos.step);
    } 
    if(this.#displayBar) this.#progressbar(Number(this.#input.value));
  }

  #progressbar = (v)=>{
    let clampMax = this.#infos.max -this.#infos.min;
    let clampValue = v -this.#infos.min;
    
    let percent = clampMax==0?0:clampValue/clampMax;

    this.root.style.background = `linear-gradient(90deg, #2b21b6 ${Math.round(percent*100)}%, var(--light-gray) ${Math.round(percent*100)}%)`


  }


}

export { Stepper };
