import { UI_Component } from "./UI_Component.js";

 class Splitter extends UI_Component{

  constructor (root, type){
    super(root);
    this.handle = this.root.querySelector('.splitter');

    this.type = type;
    this.isHolding = false;

    this.on(this.handle, 'pointerdown', ()=>{this.isHolding = true});
    this.on(document, 'pointerup', ()=>{this.isHolding = false});
    
    if(this.type=='h'){
      this.on(document, 'pointermove', (e)=>{this.horizontalSplit(e)});
    }else{
      this.on(document, 'pointermove', (e)=>{this.verticalSplit(e)});
    }

  }

  verticalSplit = (e)=>{
    if(this.isHolding){
      const width = document.body.clientWidth;
      this.root.style.width = `${width-(e.x)}px`;
    }
  }
  horizontalSplit = (e)=>{
    if(this.isHolding){
      const height = document.body.clientHeight;
      this.root.style.height = `${(height-e.y)}px`;
    }
  }




} 
export {Splitter};