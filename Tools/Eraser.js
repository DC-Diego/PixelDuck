import { BrushEraserToolBase } from "./BrushEraserToolBase.js";
import { Tools } from "./tools.js";

export class Eraser extends BrushEraserToolBase{


  #canvasCopy = null;


  opacity = {
    name: "opacity",
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
    list: [this.opacity, this.size ]
    
  };

  constructor(){
    super(true, true, true);
  }

  getProperties(){
    return this.#properties;

  }
  setProperties({size, opacity}){
    this.opacity.value = opacity;
    this.size.value = size;

  }

  setCanvasCopy = (copy)=>{
    this.#canvasCopy = JSON.parse(JSON.stringify(copy));
  }


  
  pointerDown=(x,y, canvas)=>{
   
    return super.pointerDown(x,y,null);

  }
  pointerMove=(x,y, canvas)=>{
    return super.pointerMove(x,y,null);
  }

  pointerUp=()=>{
    return super.pointerUp();
  }




}