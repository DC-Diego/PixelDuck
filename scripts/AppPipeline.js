
export class AppPipeline{

  #actionHistory;
  #Render;



  #activeLayer = 0;
  #activeFrame = 0;
  #actionList = null;

  #data = null;
  #WIDTH = 32; // cols -> y
  #HEIGHT = 32; // rows -> x
  constructor(width, height){
    this.#data = Array.from({ length: this.#WIDTH }, () => new Array(this.#HEIGHT).fill(null));
    this.#WIDTH = width;
    this.#HEIGHT = height;

  }

  setActionHistory(actionHistory){
    this.#actionHistory = actionHistory;
  }

  setRender(Render){
    this.#Render = Render;
  }

  getData(){
    return this.#data;
  }
  setData(data){
    this.#data = data;
  }


  getOldColor(x,y ){
    // console.log(x,y )
    // console.log(this.#data.length, this.#data[0].length )
    return this.#data[x][y];
  }

  setActiveLayer(activeLayer){
    this.#activeLayer = activeLayer;
  }
  setActiveFrame(activeFrame){
    this.#activeFrame = activeFrame;
  }



  newAction(actionList, options){
    const {type, toolGroup, toolName} = actionList;
    const {before, after} = options;
    this.#actionList = {
      activeFrame: this.#activeFrame,
      activeLayer: this.#activeLayer,
      type: type,
      toolGroup: toolGroup,
      toolName: toolName,
      before: before,
      after: after,
      actions: []

    }


  }

  #modifyData = (x,y,c)=>{
    this.#data[x][y] = c;
  }

  Tool(actionList, options){
    // console.log(actionList)
    if(this.#actionList == null){
      if(actionList.toolGroup == "canvasDraw" && options.before == undefined){
        options.before = this.getOldColor(actionList.pixels[0].x,actionList.pixels[0].y);
      }
      this.newAction(actionList, options);
    }
    
    this.#Render.renderPixelList(actionList.pixels, this.#actionList.after, this.#Render.canvasListEnum.CURRENT, this.#modifyData);
    
    this.#actionList.actions.push(actionList.pixels)


  }

  Commit(){
    if(this.#actionList != null){
      this.#actionHistory.pushHistory(this.#actionList);
      this.#actionList = null;
      this.#actionHistory.print();
    }
  }



};