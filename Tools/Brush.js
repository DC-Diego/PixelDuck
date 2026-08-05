import { BrushEraserToolBase } from "./BrushEraserToolBase.js";
import { ToolsService } from "./ToolsService.js";


export class Brush extends BrushEraserToolBase{

  color =  {
    name: "color",
    type: "color",
    value: "#000000",
    colorPallete: false
  };
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
  merge  = {
    name: "merge",
    type: "checkbox",
    value: true,

  };
  
  #canvasCopy = null;




  #properties = {
    tab_name: "Brush - Properties",
    list: [this.opacity, this.size , this.color, this.merge]
    
  };




  constructor(){
    super(true, true, true);
  }

  setCanvasCopy = (copy)=>{
    this.#canvasCopy = JSON.parse(JSON.stringify(copy));
  }

  setColor = (c)=>{
    this.color.value = c; 
  }

  getProperties(){
    return this.#properties;

  }
  
  setProperties({size, opacity, color, merge}){
    this.color.value = color;
    this.opacity.value = opacity;
    this.size.value = size;
    this.merge.value = merge;

  }

  getColor(){
    return `${this.color.value}${Math.trunc(this.opacity.value*255).toString(16)}`;

  }

  pointerDown=(x,y)=>{
    const result = super.pointerDown(x,y);
    if(result != null) ToolsService.brushService(result, {color: this.getColor(), merge: this.merge.value})

    return result;

  }

  pointerMove=(x,y)=>{
    const result =super.pointerMove(x,y); 
    if(result != null)    ToolsService.brushService(result, {color: this.getColor(), merge: this.merge.value})
    return result 

  }
  
  pointerUp=()=>{
    return super.pointerUp();
  }




}