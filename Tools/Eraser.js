import { BrushEraserToolBase } from "./BrushEraserToolBase.js";
import { Tools } from "./tools.js";

export class Eraser extends BrushEraserToolBase{


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
    const eraserFunction = (x,y)=>{
      canvas.erase(x,y);
    }
    return super.pointerDown(x,y,null, eraserFunction);

  }
  pointerMove=(x,y, canvas)=>{
    const eraserFunction = (x,y)=>{
      canvas.erase(x,y);
    }
    return super.pointerMove(x,y,null, eraserFunction);
  }

  pointerUp=()=>{
    return super.pointerUp();
  }




}