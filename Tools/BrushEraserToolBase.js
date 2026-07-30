import { Tools } from "./tools.js";
import {toHex, toRGBA} from "../Utils/Conversions.js"
import { alphaBlend } from "../Utils/BlendModes.js";


export class BrushEraserToolBase extends Tools{

  #lastPixel = {x: null, y: null};
  constructor(){
    super(true, true, true);
  }

  #passOptions = {
    color: null, 
    merge: true
  }
  

  
  
  pointerDown(x,y, color, merge = null){
    this.#lastPixel = {x:x,y:y};
    if(merge == null) throw console.error("MERGE NOT DEFINED");
    this.#passOptions = {
      color: color,
      merge: merge
    };
    return {
      actionList:{
        type: undefined,
        toolGroup: undefined,
        toolName: undefined,
        pixels:[{
          x: x,
          y: y,
          before: undefined,
          after: undefined
        }]
      },
      options: this.#passOptions
    }
  }

  pointerMove(x,y){
    const sx = this.#lastPixel.x;
    const sy = this.#lastPixel.y;
    const dx = x-sx;
    const dy = y-sy;
    const n = Math.max(Math.abs(dx), Math.abs(dy));
    if(n == 0) return null;
    const pixels = [];
    for(let i  =1; i <= n;i++){
      let tx = Math.round(sx+dx*i/n); 
      let ty = Math.round(sy+dy*i/n);
 
      pixels.push({
        x: tx,
        y: ty,
        before: undefined,
        after: undefined
      });
    }

    this.#lastPixel = {x:x,y:y};

    return {
      actionList:{
        pixels: pixels
      },
      options: this.#passOptions
    }
  }

  pointerUp(){
    return {
      pixels: null,
      commit: true
    };
  }




}

