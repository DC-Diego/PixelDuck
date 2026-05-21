import { Brush } from "./Brush.js";
import { Tools } from "./tools.js";

export class ToolManager{

  static Tools = Object.freeze({
    GRAB: 0,
    BRUSH: 1,
    ERASER: 2,
    SELECT_RETANGLE: 3,
    SELECT_WAND: 4,
    BUCKET_FILL: 5,
    DROPPER: 6, 
    CROP: 7,
    ZOOM_IN: 8,
    ZOOM_OUT: 9,
    SHAPE_RETANGLE: 10,
    SHAPE_LINE: 11,
    SHAPE_CIRCLE: 12
    // ColorPicker: 999,
  });

  #activeTool;
  #toolId;
  #toolsList = [
    new Tools(),
    new Brush()
  ];

  #action = {
    actionName: "NULL-TOOL",
    changes: []

  };

  constructor(activeTool){
    this.setActiveTool(activeTool);

  }

  setActiveTool = (activeTool)=>{
    this.#toolId = activeTool;
    this.#activeTool = this.#toolsList[activeTool];


  }

  getActiveToolName = ()=>{
    return this.#toolId;
  }

  pointerDown = (x,y, canvas)=>{
    if(this.#activeTool.requireCanvasCopy){
      console.log("missing...")
    }
    this.#action.actionName = this.#toolId;
    const returnedAction = this.#activeTool.pointerDown(x,y, canvas);

    this.#action.changes.push(returnedAction);

    if(this.#activeTool.isContinuous == false){
      console.log("Commit to history")
    }
  }

  pointerMove = (x,y, canvas)=>{
    this.#action.actionName = this.#toolId;
    const returnedAction = this.#activeTool.pointerMove(x,y, canvas);

    this.#action.changes.push(returnedAction);



  }

  pointerUp = (x,y, canvas)=>{
    this.#action.actionName = this.#toolId;
    const returnedAction = this.#activeTool.pointerUp(x,y, canvas);
    this.#action.changes.push(returnedAction);

    console.log("commit to history");



  }




}