export class Tools{

  isContinuous = false;
  requireCanvasCopy = false;
  constructor(isContinuous, requireCanvasCopy){
    this.isContinuous = isContinuous;
    this.requireCanvasCopy = requireCanvasCopy;

  }

  init=()=>{}
  pointerDown=()=>{}
  pointerMove=()=>{}
  pointerUp=()=>{}
};