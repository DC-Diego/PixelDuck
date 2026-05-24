export class Tools{

  isContinuous = false;
  requireCanvasCopy = false;
  modifyCanvas = true;
  constructor(isContinuous, requireCanvasCopy, modifyCanvas){
    this.isContinuous = isContinuous;
    this.requireCanvasCopy = requireCanvasCopy;
    this.modifyCanvas = modifyCanvas;

  }

  init=()=>{}
  pointerDown=()=>{}
  pointerMove=()=>{}
  pointerUp=()=>{}
};