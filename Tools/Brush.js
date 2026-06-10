import { BrushEraserToolBase } from "./BrushEraserToolBase.js";


export class Brush extends BrushEraserToolBase{

  color = "#ff0000";
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
  
  pointerDown=(x,y,canvas)=>{
    const brushFunction = (x,y)=>{
      canvas.draw(x,y, this.color);
    }
    return super.pointerDown(x,y, this.color, brushFunction);


  }

  pointerMove=(x,y, canvas)=>{
    const brushFunction = (x,y)=>{
      canvas.draw(x,y,this.color);
    }
    return super.pointerMove(x,y,this.color, brushFunction);

  }
  
  pointerUp=()=>{
    return super.pointerUp();
  }




}