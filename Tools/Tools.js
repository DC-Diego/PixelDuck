export class Tools{

  isContinuous = false;
  requireCanvasCopy = false;
  isCanvasModifyTool = true;

  constructor(isContinuous, requireCanvasCopy, isCanvasModifyTool){
    this.isContinuous = isContinuous;
    this.requireCanvasCopy = requireCanvasCopy;
    this.isCanvasModifyTool = isCanvasModifyTool;

  }

  init(){}
  pointerDown(){}
  pointerMove(){}
  pointerUp(){}
};