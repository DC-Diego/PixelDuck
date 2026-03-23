import {confirmDialog} from '../components/POPUP_confirm.js';
import { ComboBox } from '../UI/ComboBox.js';
import { PresetInput } from '../UI/PresetInput.js';
import {Splitter} from  '../UI/Splitter.js';
import {Stepper} from  '../UI/Stepper.js';
import { ToggleReveal } from '../UI/ToggleReveal.js';
import { UI_Component } from '../UI/UI_Component.js';

class Timeline extends UI_Component{

  
  #Properties; #framesContent = []; #framesDom = [];#totalFrames;

  #components={};
  constructor(root, f){
    super(root)
    this.#Properties = {
      WIDTH: document.body.clientWidth,
      FRAME_WIDTH: 120,
      FRAME_GAP:6,

    }
    this.frameContainer = f
    this.#totalFrames = 60;
    this.activeFrame = null;

    for(let i =0;i<this.#totalFrames;i++){
      this.#framesContent.push(i+1);

    }

   
    this.createFrames();
    this.#setFrameContainerWidth();
  }

  setTotalFrames = (total)=>{
    this.#totalFrames = total
    this.#components.currentFrame.setMaxInput(total);
    this.#components.startingFrame.setMaxInput(total);
    this.#components.endingFrame.setMaxInput(total);


  }

  setComponents = (comps)=>{
    this.#components = comps;
    this.#initComponents();
  }

  newComponent = (name, comp)=>{
    this.#components[name] = comp;

  }
  destroyComponent = (name)=>{
    this.#components[name].destroy();
    this.#components[name] = null;
  }
  #initComponents = ()=>{
    this.setTotalFrames(this.#totalFrames);

  }

  #setFrameContainerWidth = ()=>{
    const { FRAME_WIDTH, FRAME_GAP , WIDTH } =  this.#Properties;
    this.frameContainer.style.minWidth = `${(FRAME_WIDTH+FRAME_GAP*2)*this.#totalFrames}px`;
    this.frameContainer.style.maxWidth = `${(FRAME_WIDTH+FRAME_GAP*2)*this.#totalFrames}px`;
   
  }
  
  #setFrameContent = (e,i)=>{
    e.innerText=this.#framesContent[i];

  }


  createFrames = ()=>{
    // const { FRAME_WIDTH, FRAME_GAP , WIDTH } =  this.#Properties;
    for (let i = 0; i < this.#totalFrames; i++) {
      const frame = document.createElement('div');
      frame.classList.add("Frame");
      this.#setFrameContent(frame, i)
      this.frameContainer.appendChild(frame);
      if(i == 0){ this.#setActiveFrame(frame)}
      frame.addEventListener('pointerdown', ()=>{this.#setActiveFrame(frame)})
      this.#framesDom.push(frame);

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
