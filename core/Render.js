export class Render{

  canvasListEnum = Object.freeze({
    BEFORE: 0,
    CURRENT: 1,
    AFTER: 2,
    ONION_BEFORE: 3,
    ONION_NEXT: 4
  });  
  
  #canvasList = [null, null, null, null, null];

  constructor(beforeCanvas, currentCanvas, afterCanvas, onion_beforeCanvas, onion_nextCanvas){
    this.#canvasList[0] = beforeCanvas;
    this.#canvasList[1] = currentCanvas;
    this.#canvasList[2] = afterCanvas;
    this.#canvasList[3] = onion_beforeCanvas;
    this.#canvasList[4] = onion_nextCanvas;
  }

  
  renderPixelList=(pixelList, color, canvasId, modifyData = ()=>{})=>{
    for (let i = 0; i < pixelList.length; i++) {
      const e = pixelList[i];
      modifyData(e.x, e.y, color);
      if(color==null){
        this.#canvasList[canvasId].erase(e.x, e.y);
      }else{
        this.#canvasList[canvasId].draw(e.x, e.y, color);
      }
    }

  }




}