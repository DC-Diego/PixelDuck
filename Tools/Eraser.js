import { Tools } from "./tools.js";

export class Eraser extends Tools{


  #lastPixel = {x: null, y: null};
  #canvasCopy = null;

  constructor(){
    super(true, true, true);
  }

  setCanvasCopy = (copy)=>{
    this.#canvasCopy = JSON.parse(JSON.stringify(copy));
  }

  setColor = (c)=>{
    this.color = c;
  }
  
  pointerDown=(x,y, canvas)=>{
    
    this.#lastPixel = {x:x,y:y};
    canvas.erase(x,y);
    return {
      pixels:[{
        x: x,
        y: y,
        // before: this.#canvasCopy[x][y],
        after: null
      }],
      commit: false
    }
  }
  pointerMove=(x,y, canvas)=>{
    const sx = this.#lastPixel.x;
    const sy = this.#lastPixel.y;
    const dx = sx-x;
    const dy = sy-y;
    const n = Math.max(Math.abs(dx), Math.abs(dy));
    const pixels = [];
    for(let i  =0; i < n;i++){

      let tx = Math.abs(sx+dx*i/n); let ty = Math.abs(sy+dy*i/n);
      
      canvas.erase(tx,ty);
      
      pixels.push({
        x: tx,
        y: ty,
        // before: this.#canvasCopy[tx][ty],
        after: null
      });
    }

    this.#lastPixel = {x:x,y:y};

    return {
      pixels: pixels,
      commit: false
    }
  }

  pointerUp=()=>{
    return {
      pixels: null,
      commit: true
    };
  }




}