import { Tools } from "./tools.js";

export class BrushEraserToolBase extends Tools{

  #lastPixel = {x: null, y: null};
  constructor(){
    super(true, true, true);
  }


  
  pointerDown(x,y, color){
    this.#lastPixel = {x:x,y:y};
    return {
      actionList:{
        type: undefined,
        toolGroup: undefined,
        toolName: undefined,
        pixels:[{
          x: x,
          y: y,
        }]
      },
      options:{
        before: undefined,
        after: color,
      }
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
    for(let i  =0; i <= n;i++){
      let tx = Math.round(sx+dx*i/n); 
      let ty = Math.round(sy+dy*i/n);
 
      pixels.push({
        x: tx,
        y: ty,
      });
    }

    this.#lastPixel = {x:x,y:y};

    return {
      actionList:{
        pixels: pixels
      },
      options: null
    }
  }

  pointerUp(){
    return {
      pixels: null,
      commit: true
    };
  }




}

