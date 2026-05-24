import { Tools } from "./tools.js";

export class Grab extends Tools{

  isMoving = false;
  startMovement = {x: null, y: null}
  
  canvasProperties = {
    x: 0,
    y: 0,
    width: undefined,
    height: undefined,
    aspectRatio: undefined,
    scale: 1 
  };
  constructor(){
    super(false, false, false)
  }

  init=()=>{}//
  pointerDown=(x,y, {mainViewport, canvasProperties})=>{
    if(mainViewport == undefined) return

    this.canvasProperties = canvasProperties;
    mainViewport.style.cursor="grabbing"; 
    this.isMoving = true; 
    this.startMovement = {x: x, y: y}; 

  }


  pointerMove=(x, y, {canvasArea})=>{
    if(canvasArea == undefined) return;
    if(this.isMoving){
      canvasArea.style.transform = `translateX(${this.canvasProperties.x+x-this.startMovement.x  }px)       translateY(${this.canvasProperties.y+ y-this.startMovement.y}px) scale(${this.canvasProperties.scale}) `;
    }  
  }
  pointerUp=(x,y, {mainViewport})=>{
    if(mainViewport == undefined) return;
    if(this.isMoving) { 
      this.isMoving = false;
      mainViewport.style.cursor="grab";
      this.canvasProperties.x = this.canvasProperties.x+x-this.startMovement.x;
      this.canvasProperties.y = this.canvasProperties.y+y-this.startMovement.y;
      // return this.canvasProperties;
    } 
  }


}