
import { UI_Component } from '../UI/UI_Component.js';

class Timeline extends UI_Component{

  
  #Properties; #framesContent = []; #framesDom = [];#totalFrames;


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
