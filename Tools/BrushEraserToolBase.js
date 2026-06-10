import { Tools } from "./tools.js";

export class BrushEraserToolBase extends Tools{

  #lastPixel = {x: null, y: null};
  constructor(){
    super(true, true, true);
  }


  
  pointerDown(x,y, color, tool){
    this.#lastPixel = {x:x,y:y};
    tool(x,y);
    return {
      pixels:[{
        x: x,
        y: y,
        // before: this.#canvasCopy[x][y],
        after: color
      }],
      commit: false
    }
  }

  pointerMove(x,y,color, tool){
    const sx = this.#lastPixel.x;
    const sy = this.#lastPixel.y;
    const dx = sx-x;
    const dy = sy-y;
    const n = Math.max(Math.abs(dx), Math.abs(dy));
    const pixels = [];
    for(let i  =0; i < n;i++){

      let tx = Math.ceil(sx+dx*i/n); 
      let ty = Math.ceil(sy+dy*i/n);
      tool(x,y);
 
      pixels.push({
        x: tx,
        y: ty,
        // before: this.#canvasCopy[tx][ty],
        after: color
      });
    }

    this.#lastPixel = {x:x,y:y};

    return {
      pixels: pixels,
      commit: false
    }
  }

  pointerUp(){
    return {
      pixels: null,
      commit: true
    };
  }




}

