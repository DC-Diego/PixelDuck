import { BrushEraserToolBase } from "./BrushEraserToolBase.js";


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
  check  = {
    name: "Merge Colors",
    type: "checkbox",
    value: true,

  };
  
  #canvasCopy = null;




  #properties = {
    tab_name: "Brush - Properties",
    list: [this.opacity, this.size , this.color, this.check]
    
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
  
  setProperties({size, opacity, color}){
    this.color.value = color;
    this.opacity.value = opacity;
    this.size.value = size;

  }

  getColor(){
    return `${this.color.value}${Math.trunc(this.opacity.value*255).toString(16)}`;

  }

  pointerDown=(x,y,canvas)=>{
    return super.pointerDown(x,y, this.getColor());


  }

  pointerMove=(x,y, canvas)=>{
    return super.pointerMove(x,y);

  }
  
  pointerUp=()=>{
    return super.pointerUp();
  }




}