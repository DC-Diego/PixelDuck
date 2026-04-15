
import { UI_Component } from '../UI/UI_Component.js';

class Timeline extends UI_Component{

  #startFrame; #endFrame; #loopingType;
  #Properties; #framesContent = []; #framesDom = []; #activeID;
  #orchestratorFuncs = {};
  #totalFrames = 0;


  #FrameSliderProps;

  constructor(root, f, orchestratorFuncs){
    super(root)
    this.#Properties = {
      WIDTH: document.body.clientWidth,
      FRAME_WIDTH: 120,
      FRAME_GAP:6,

    }
    this.#orchestratorFuncs = orchestratorFuncs;
    this.frameContainer = f
    this.activeFrame = null;
    this.#activeID = 0;
    
    this.#startFrame = 0;
    this.#endFrame = 0;
    this.#loopingType;



    this.#FrameSliderProps = {
      dragging: null,
      target: -1,
      destiny: -1
    };

    this.on(this.frameContainer, 'dragover', this.dragoverContainer);
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

 
  dragoverContainer = (e)=>{
    e.preventDefault();
    const left = e.clientX-this.frameContainer.offsetLeft;
    
    this.#FrameSliderProps.dragging.style.display='none';
    let i = Math.floor(left/(132));
    document.querySelector(".JSframeDragMargin")?.classList.remove('JSframeDragMargin');
    this.#FrameSliderProps.destiny = i;
    if(i >= this.#FrameSliderProps.x ) i = i+1;
    if(i <= this.#framesDom.length-1)
    this.#framesDom[i].classList.add("JSframeDragMargin");
  }

  #dragStartFrame = (e,position)=>{
    this.#FrameSliderProps.dragging = e.target;
    this.#FrameSliderProps.x = position;
    this.#FrameSliderProps.destiny = -1;

  }
  #dragEndFrame = (e)=>{
    if(this.#FrameSliderProps.x == -1 || this.#FrameSliderProps.destiny==-1) return;
    this.#FrameSliderProps.dragging = null;
    document.querySelector(".JSframeDragMargin")?.classList.remove('JSframeDragMargin');
    e.target.style.display = 'flex';
    this.#orchestratorFuncs.reorderFrames(this.#FrameSliderProps.x, this.#FrameSliderProps.destiny);
    this.#orchestratorFuncs.updateCurrentFrame(this.#FrameSliderProps.destiny);
    this.#FrameSliderProps.x = -1;

  }

  renderFrames = ()=>{
    console.log("RENDER")
    this.frameContainer.innerHTML="";
    for(let i = 0; i <this.#totalFrames;i++){
      const frame= this.#framesDom[i];
      this.#setFrameContent(frame, i)
      this.frameContainer.appendChild(frame);
      frame.draggable = 'true';

    }
  }

  removeFrame = ()=>{
    this.#totalFrames -=1;
    this.renderFrames();
  }

  createFrames = (position, id)=>{
    const frame = document.createElement('div');
    frame.classList.add("Frame");
    this.#framesDom.push(frame);

    frame.addEventListener('dragstart', (e)=>this.#dragStartFrame(e, position));
    frame.addEventListener('dragend', this.#dragEndFrame)
    frame.addEventListener('pointerdown', ()=>this.#orchestratorFuncs.updateCurrentFrame(id) );
    this.#totalFrames +=1;
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
