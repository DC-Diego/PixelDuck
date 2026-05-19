import { UI_Component } from "./UI_Component.js";

 class Splitter extends UI_Component{

  #handle; #type ; #isHolding;

  constructor (root, type){
    super(root);
    this.#handle = this.root.querySelector('.splitter');

    this.#type = type;
    this.#isHolding = false;

    this.on(this.#handle, 'pointerdown', (e)=>{e.stopPropagation(); this.#isHolding = true});
    this.on(document, 'pointerup', (e)=>{e.stopPropagation(); this.#isHolding = false});
    
    if(this.#type=='h'){
      this.on(document, 'pointermove', (e)=>{this.#horizontalSplit(e)});
    }else{
      this.on(document, 'pointermove', (e)=>{this.#verticalSplit(e)});
    }

  }

  #verticalSplit = (e)=>{
    e.stopPropagation();
    if(this.#isHolding){
      const width = document.body.clientWidth;
      this.root.style.width = `${width-(e.x)}px`;
    }
  }
  #horizontalSplit = (e)=>{
    e.stopPropagation();
    if(this.#isHolding){
      const height = document.body.clientHeight;
      this.root.style.height = `${(height-e.y)}px`;
    }
  }




} 
export {Splitter};