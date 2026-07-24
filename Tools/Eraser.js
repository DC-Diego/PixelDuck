import { BrushEraserToolBase } from "./BrushEraserToolBase.js";
import { Tools } from "./tools.js";

export class Eraser extends BrushEraserToolBase{


  #canvasCopy = null;


  strength = {
    name: "strength",
    type: "number",
    min: 0,
    max: 1 ,
    value: 1,
    step: 0.01,
    sensitive: 1,
  };
  size = {
    name: "size",
    type: "number",
    min: 1,
    max: 3 ,
    value: 1,
    step: 0.01,
    sensitive: 1,

  };

  #properties = {
    tab_name: "Eraser - Properties",
    list: [this.strength, this.size ]
    
  };

  constructor(){
    super(true, true, true);
  }

  getProperties(){
    return this.#properties;

  }
  setProperties({size, strength}){
    this.strength.value = strength;
    this.size.value = size;

  }

  setCanvasCopy = (copy)=>{
    this.#canvasCopy = JSON.parse(JSON.stringify(copy));
  }


  
  pointerDown=(x,y, canvas)=>{
   const eraserColor = "#000000"+(Math.floor(255*(1-this.strength.value))).toString(16).padStart(2,'0')
    return super.pointerDown(x,y, null );

  }
  pointerMove=(x,y, canvas)=>{
    return super.pointerMove(x,y,null);
  }

  pointerUp=()=>{
    return super.pointerUp();
  }




}