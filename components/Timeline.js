import {confirmDialog} from '../components/POPUP_confirm.js';
import { ComboBox } from '../UI/ComboBox.js';
import { PresetInput } from '../UI/PresetInput.js';
import {Splitter} from  '../UI/Splitter.js';
import {Stepper} from  '../UI/Stepper.js';
import { ToggleReveal } from '../UI/ToggleReveal.js';

class Timeline{

  
  constructor(frameArea){
    const WIDTH = document.body.clientWidth;
    const FRAME_WIDTH = 120;
    const FRAME_GAP = 6;
    this.frameArea = frameArea;
    this.qtdFrames = 60;
    this.activeFrame = null;


    this.createFrames();
    
  }


  createFrames = ()=>{
    for (let i = 0; i < this.qtdFrames; i++) {
      const frame = document.createElement('div');
      frame.classList.add("Frame");
      frame.innerText=(i+1+"");
      this.frameArea.appendChild(frame);
      if(i == 0){ this.#setActiveFrame(frame)}
      frame.addEventListener('pointerdown', ()=>{this.#setActiveFrame(frame)})


    }

  }

  TEMPORARIO_REMOVER_DEPOIS(i){
    const canvas = document.getElementById("canvasArea");
    canvas.innerText = i+"";


  }


  #setActiveFrame = (e)=>{
    if(this.activeFrame) this.activeFrame.classList.remove("active");
    e.classList.add("active");
    this.activeFrame = e;
    this.TEMPORARIO_REMOVER_DEPOIS(e.innerText);
  }

  static console(msg){
    console.log(msg);
  }




}

export {Timeline}
