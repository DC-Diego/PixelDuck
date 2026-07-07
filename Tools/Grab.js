import { Tools } from "./tools.js";

export class Grab extends Tools{

  isMoving = false;
  startMovement = {x: null, y: null}
  

  #left = {
    name: "left",
    type: "number",
    min: -32,
    max: 32,
    value: 1,
    step: 0.5,
    sensitive: 1,

  };
  #top = {
    name: "top",
    type: "number",
    min: -32,
    max: 32,
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

  constructor(grabService){
    super(false, false, false)
    this.#grabService = grabService;
  }



  getProperties(){
    return this.#properties;

  }
  setProperties({left, top}){
    this.#left.value = left;
    this.#top.value = top;
    // this.canvasProperties.x = left;
    // this.canvasProperties.y = top;
    const blabla = {
      tx: this.canvasProperties.x+left,
      ty: this.canvasProperties.y-top,
      scale: this.canvasProperties.scale}

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


  pointerMove=(x, y, {transformCanvas})=>{
    if(transformCanvas == undefined) return;
    if(this.isMoving){
      transformCanvas({
        tx: this.canvasProperties.x+x-this.startMovement.x,
        ty: this.canvasProperties.y+y-this.startMovement.y,
        scale: this.canvasProperties.scale});
    }  
  }
  pointerUp=(x,y, {mainViewport})=>{
    if(mainViewport == undefined) return;
    if(this.isMoving) { 
      this.isMoving = false;
      mainViewport.style.cursor="grab";
      this.canvasProperties.x = this.canvasProperties.x+x-this.startMovement.x;
      this.canvasProperties.y = this.canvasProperties.y+y-this.startMovement.y;
    } 
  }


}