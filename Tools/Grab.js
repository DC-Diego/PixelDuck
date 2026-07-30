import { Tools } from "./tools.js";

export class Grab extends Tools{

  isMoving = false;
  startMovement = {x: null, y: null}
  

  #left = {
    name: "left",
    type: "number",
    min: -600,
    max: 600,
    value: 1,
    step: 0.5,
    sensitive: 1,

  };
  #top = {
    name: "top",
    type: "number",
    min: -400,
    max: 400,
    value: 1,
    step: 0.5,
    sensitive: 1,

  };

  #properties = {
    tab_name: "Grab - Properties",
    list: [this.#left, this.#top ]
    
  };

  canvasProperties = {
    x: 0,
    y: 0,
    width: undefined,
    height: undefined,
    aspectRatio: undefined,
    scale: 1 
  };

  #grabService;
  #updateProperties;

  constructor(updateProperties, grabService){
    super(false, false, false)
    this.#grabService = grabService;
    this.#updateProperties = updateProperties;
  }




  getProperties(){
    return this.#properties;

  }
  setProperties({left, top}){
    const blabla = {
      tx: left,
      ty: -top,
      scale: this.canvasProperties.scale}
      
    this.canvasProperties.x = left;
    this.canvasProperties.y = -top;
    this.#grabService(blabla)
  }

  init=()=>{}//

  pointerDown=(x,y, {mainViewport, canvasProperties})=>{
    if(mainViewport == undefined) return

    this.canvasProperties = canvasProperties;
    mainViewport.style.cursor="grabbing"; 
    this.isMoving = true; 
    this.startMovement = {x: x, y: y}; 

  }

  // Change TransformCanvas to this.#grabService, also sync left & top with canvas props x & y
  pointerMove=(x, y)=>{
    if(this.isMoving){
      const tx = this.canvasProperties.x+x-this.startMovement.x;
      const ty = this.canvasProperties.y+y-this.startMovement.y
      this.#grabService({
        tx: Math.min(Math.max(tx, this.#left.min), this.#left.max),
        ty: Math.min(Math.max(ty, this.#top.min), this.#top.max),
        scale: this.canvasProperties.scale
      })
    }  
  }
  pointerUp=(x,y, {mainViewport})=>{
    if(mainViewport == undefined) return;
    if(this.isMoving) { 
      this.isMoving = false;
      mainViewport.style.cursor="grab";
      this.canvasProperties.x = this.canvasProperties.x+x-this.startMovement.x;
      this.canvasProperties.y = this.canvasProperties.y+y-this.startMovement.y;
      this.#updateProperties({left: this.canvasProperties.x, top: -this.canvasProperties.y});
    } 
  }


}