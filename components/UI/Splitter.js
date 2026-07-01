import { UI_Component } from "./UI_Component.js";

// side parameter: left = -1, top = -1, right = 1, bottom = 1;
class Splitter extends UI_Component{

  #handle; #type; #isHolding; #side;

  #props = {x: 0, y: 0, width: 0, height:0 }

  constructor (root, type, side = 1){
    super(root);
    this.#handle = this.root.querySelector('.splitter');
    this.#handle.innerHTML = "";
    this.#type = type;
    this.#side = side;
    this.#isHolding = false;
    
    this.#handle.draggable = false;

    this.on(this.#handle, 'pointerdown', this.#pointerdown);

    this.on(document, 'pointerup', (e)=>{e.stopPropagation(); this.#isHolding = false});
    
    if(this.#type=='h'){
      this.on(document, 'pointermove', (e)=>{this.#horizontalSplit(e)});
    }else{
      this.on(document, 'pointermove', (e)=>{this.#verticalSplit(e)});
    }

  }

  #pointerdown = (e)=>{
    e.stopPropagation(); 
    this.#isHolding = true
    this.#props.width = this.root.clientWidth;
    this.#props.height = this.root.clientHeight;
    this.#props.x = e.x;
    this.#props.y = e.y;  
  }

  #verticalSplit = (e)=>{
    e.stopPropagation();
    if(this.#isHolding){
      const {width, x} = this.#props;
      const dx = e.x-x;
      
      this.root.style.width = `${width+this.#side*dx}px`;
    }
  }
  #horizontalSplit = (e)=>{
    e.stopPropagation();
    if(this.#isHolding){
      const {height, y} = this.#props;
      const dx = e.y-y;
      this.root.style.height = `${(height+this.#side*dx)}px`;
    }
  }




} 
export {Splitter};