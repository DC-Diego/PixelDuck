import { toRGBA } from "../Utils/Conversions.js";
import { Tools } from "./tools.js";
import { ToolsService } from "./ToolsService.js";


export class BucketFill extends Tools{

  color =  {
    name: "color",
    type: "color",
    value: "#000000",
    colorPallete: false
  };
  mix = {
    name: "mix",
    type: "number",
    min: 0,
    max: 1,
    value: 1,
    step: 0.01,
    sensitive: 1,

  };
  precision = {
    name: "precision",
    type: "number",
    min: 0,
    max: 1,
    value: 1,
    step: 0.01,
    sensitive: 1,

  };
  
  #canvasCopy = null;

  #properties = {
    tab_name: "Bucket fill - Properties",
    list: [this.color, this.precision , this.mix]
    
  };




  constructor(){
    super(false, true, true);
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
  
  setProperties({precision, color, mix}){
    this.color.value = color;
    this.precision.value = precision;
    this.mix.value = mix;

  }

  getColor(){
    return `${this.color.value}`;

  }

  pointerDown=(x,y, color_in)=>{
    // const pixels = [{
    //   x: x,
    //   y: y,
    //   before: [0,0,0,0],
    //   after: toRGBA(this.color.value)
    // }]
    // console.log(pixels[0].after)
    // console.log(precision.value)
    return {
      actionList:{
        type: undefined,
        toolGroup: undefined,
        toolName: undefined,
        pixels: ToolsService.bucketFillService(x,y, {precision: this.precision.value, mix: this.mix.value, color: toRGBA(this.color.value)})
      }
    }

    

  }

  pointerMove=(x,y)=>{
    return null; 

  }
  
  pointerUp=()=>{
    return null;
  }




}