class Render{

  canvasListEnum = Object.freeze({
    BEFORE: 0,
    CURRENT: 1,
    AFTER: 2,
    ONION_BEFORE: 3,
    ONION_AFTER: 4
  });  
  
  #canvasList = [null, null, null, null, null];

  constructor(beforeCanvas, currentCanvas, afterCanvas, onion_beforeCanvas, onion_afterCanvas){
    this.#canvasList[0] = beforeCanvas;
    this.#canvasList[1] = currentCanvas;
    this.#canvasList[2] = afterCanvas;
    this.#canvasList[3] = onion_beforeCanvas;
    this.#canvasList[4] = onion_afterCanvas;
  }

  
  render=(pixelList, color, canvasId)=>{
   

    // for (let i = 0; i < pixelList.length; i++) {
    //   const e = pixelList[i];
    //   if(e.color==null){
    //     this.#canvasList[canvasId].erase(e.x, e.y);
    //   }else{
    //     this.#canvasList[canvasId].draw(e.x, e.y, e.color);
    //   }


    // }



  }




}