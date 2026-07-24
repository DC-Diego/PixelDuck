import { Tools } from "./tools.js";

export class BrushEraserToolBase extends Tools{

  #lastPixel = {x: null, y: null};
  constructor(){
    super(true, true, true);
  }

  #toRGBA(s){
    const p = [0,0,0,0];
    if(s==null)return p;
    p[0] = parseInt(s.substring(1,3), 16);
    p[1] = parseInt(s.substring(3,5), 16);
    p[2] = parseInt(s.substring(5,7), 16);
    p[3] = parseInt(s.substring(7,9), 16);
    return p;
  }


  #colorMixer(rgba_old, rgba_new) {
    const COLOR_1 = this.#toRGBA(rgba_old); // Foreground (Top layer)
    const COLOR_2 = this.#toRGBA(rgba_new); // Background (Bottom layer)
  
    const a1 = COLOR_1[3] / 255;
    const a2 = COLOR_2[3] / 255;
  
    const ALPHA_OUT = a1 + a2 * (1 - a1);
  
    if (ALPHA_OUT === 0) {
      return [0,0,0,0];
    }
  
    const r_out = (COLOR_1[0] * a1 + COLOR_2[0] * a2 * (1 - a1)) / ALPHA_OUT;
    const g_out = (COLOR_1[1] * a1 + COLOR_2[1] * a2 * (1 - a1)) / ALPHA_OUT;
    const b_out = (COLOR_1[2] * a1 + COLOR_2[2] * a2 * (1 - a1)) / ALPHA_OUT;
  
    return [
      Math.round(r_out),
      Math.round(g_out),
      Math.round(b_out),
      Math.round(ALPHA_OUT * 255)
    ];
  }
  
  pointerDown(x,y, color){
    this.#lastPixel = {x:x,y:y};
    
    // console.log(this.#colorMixer("#ff000080","#0000ffff"))
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

