import { Brush } from "./Brush.js";
import { Eraser } from "./Eraser.js";
import { Grab } from "./Grab.js";
import { Tools } from "./tools.js";

export class ToolManager{

  static Tools = Object.freeze({
    GRAB: 0,
    BRUSH: 1,
    ERASER: 2,
    BUCKET_FILL: 3,
    SELECT_RETANGLE: 4,
    SELECT_WAND: 5,
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
  #toolsList

  #action = {
    type: "tool",
    toolGroup: "tool",
    actionName: "NULL-TOOL",
    activeLayer: -1,
    activeFrame: -1,
    changes: {
      modifiedPixels: []
    }

  };


  #appToolService = ()=>{};
  #CommitToHistoryService = ()=>{};
  #toolChangeService = ()=>{};


  constructor(activeTool, appToolService, CommitToHistoryService, toolChangeService, grabService){
    this.#toolsList = [
      new Grab(grabService),
      new Brush(),
      new Eraser()
    ];
    this.setActiveTool(activeTool);
    this.#appToolService = appToolService;
    this.#CommitToHistoryService = CommitToHistoryService;
    this.#toolChangeService = toolChangeService;
    this.#toolChangeService();
   
  }

  getToolGroup(){

    return "canvasDraw";
  }

  setActiveTool = (activeTool)=>{
    this.#toolId = activeTool;
    this.#activeTool = this.#toolsList[activeTool];
    console.log(this.#activeTool)
    this.#toolChangeService(this.#activeTool.getProperties());

  }

  getActiveToolName = ()=>{
    return this.#toolId;
  }

  setProperties(props){
    this.#activeTool.setProperties(props);
  }

  pointerDown = (x,y, options)=>{
    if(this.#activeTool.isCanvasModifyTool == false){
      this.#activeTool.pointerDown(x,y, options);
    }else{
      // this.#action.actionName = this.#toolId;
      const returnedAction = this.#activeTool.pointerDown(x,y, options);
      returnedAction.actionList.type = "tool";
      returnedAction.actionList.toolGroup = this.getToolGroup();
      returnedAction.actionList.toolName = this.#toolId;
      this.#appToolService(returnedAction.actionList, returnedAction.options );
      // this.#action.changes.modifiedPixels.push(returnedAction);
      if(this.#activeTool.isContinuous == false){
        console.log("Commit to history")
        this.#CommitToHistoryService();
      }

    }  
  }

  pointerMove = (x,y, options)=>{
    if(this.#activeTool.isCanvasModifyTool == false){
      this.#activeTool.pointerMove(x,y, options); 
    }else{     
      this.#action.actionName = this.#toolId;
      const returnedAction = this.#activeTool.pointerMove(x,y, options);
      if(returnedAction != null){
        this.#appToolService(returnedAction.actionList, returnedAction.options );
      }
    }
  }

  pointerUp = (x,y, options)=>{
    if(this.#activeTool.isCanvasModifyTool == false){
      this.#activeTool.pointerUp(x,y, options);
    }else{ 
      this.#action.actionName = this.#toolId;
      const returnedAction = this.#activeTool.pointerUp(x,y, options);
      // this.#action.changes.modifiedPixels.push(returnedAction);
      this.#CommitToHistoryService();

      console.log("commit to history");     
    }
  }




}