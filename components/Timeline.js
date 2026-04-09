
import { UI_Component } from '../UI/UI_Component.js';

class Timeline extends UI_Component{

  #startFrame; #endFrame; #loopingType;
  #Properties; #framesContent = []; #framesDom = []; #totalFrames; #activeID;
  #orchestratorFuncs = {};

  constructor(root, f, orchestratorFuncs){
    super(root)
    this.#Properties = {
      WIDTH: document.body.clientWidth,
      FRAME_WIDTH: 120,
      FRAME_GAP:6,

    }
    this.#orchestratorFuncs = orchestratorFuncs;
    this.frameContainer = f
    // this.#totalFrames = 12;
    this.activeFrame = null;
    this.#activeID = 0;
    
    this.#startFrame = 0;
    this.#endFrame = 0;
    this.#loopingType;



    // for(let i =0;i<this.#totalFrames;i++){
    //   this.#framesContent.push(i);

    // }
   
    // this.createFrames();
    // this.#setFrameContainerWidth();
  }
   setActiveId = (id)=>{
    this.#activeID =id;
    
  }

  centerScroll = ()=>{
    const {FRAME_GAP, FRAME_WIDTH, WIDTH} = this.#Properties; 
    const frameSize = 2*FRAME_GAP+FRAME_WIDTH;
    this.root.scrollTo(frameSize*this.#activeID-0.5*(WIDTH-frameSize+FRAME_GAP),0)

  }

  setStartFrame = (f)=>{this.#startFrame=f; }
  setEndFrame = (f)=>{this.#endFrame=f; }
  setLoopingType = (t)=>{this.#loopingType=t; }

  setFrameContainerWidth = (totalFrames)=>{
    const { FRAME_WIDTH, FRAME_GAP } =  this.#Properties;
    this.frameContainer.style.minWidth = `${(FRAME_WIDTH+FRAME_GAP*2)*totalFrames}px`;
    this.frameContainer.style.maxWidth = `${(FRAME_WIDTH+FRAME_GAP*2)*totalFrames}px`;
   
  }
  
  #setFrameContent = (e,i)=>{
    e.innerText=Math.floor(i);

  }


  renderFrames = ()=>{
    for(let i = 0; i <this.#framesDom.length;i++){
      const frame= this.#framesDom[i];
      this.frameContainer.appendChild(frame);
      frame.addEventListener('pointerdown', ()=>{this.#orchestratorFuncs.updateCurrentFrame(i);})
   
    }


  }


  createFrames = (position, id)=>{
    const frame = document.createElement('div');
    frame.classList.add("Frame");
    this.#setFrameContent(frame, id)
    this.#framesDom.splice(position,0,frame);
    this.renderFrames();
    this.#orchestratorFuncs.updateCurrentFrame(position)

  }


  vel = 1;
  animation = ()=>{
    switch (this.#loopingType) {
      case 0: //"Play once"
        if(this.#activeID >= this.#endFrame) {
          return
          
        }
        break;
      case 1: //"Playback"
        if(this.#activeID >= this.#endFrame){
          this.#orchestratorFuncs.updateCurrentFrame(this.#startFrame);
          return;
        }


        break;
      case 2: //"Ping-Pong"
        if(this.#endFrame == this.#startFrame)   return
        else if(this.#activeID >= this.#endFrame || this.#activeID <= this.#startFrame) {
          this.vel *=-1;
        }
        break;
            
      default:
        break;
    }

    this.#orchestratorFuncs.updateCurrentFrame(this.#activeID<this.#startFrame?this.#startFrame:this.#activeID+this.vel);
  }



  getRenderContent = (i)=>{
    return this.#framesContent[i];
  }

  setFrameById =  (i)=>{
    const e = this.#framesDom[i];

    if(this.activeFrame) this.activeFrame.classList.remove("active");
    e.classList.add("active");
    this.activeFrame = e;
    this.setActiveId(i);
    this.centerScroll();
  }

  static console(msg){
    console.log(msg);
  }




}

export {Timeline}
