
export class AppPipeline{

  #actionHistory;
  #Render;



  #activeLayer = 0;
  #activeFrame = 0;
  #actionList = null;

  #pixelDocument;

  // #WIDTH = 32; // cols -> y
  // #HEIGHT = 32; // rows -> x
  constructor(pixelDocument){
    this.#pixelDocument = pixelDocument;

  }

  setActionHistory(actionHistory){
    this.#actionHistory = actionHistory;
  }

  setRender(Render){
    this.#Render = Render;
  }

  getData(){
    return this.#pixelDocument.getActiveLayer_ref();
  }
  setData(data){
    console.log("Change Data by updating ActiveLayer or ActiveFrame")
  }


  getOldColor(x,y ){
    return this.#pixelDocument.getColor(x,y);
  }

  setActiveLayer(activeLayer){
    this.#activeLayer = activeLayer;
  }
  setActiveFrame(activeFrame){
    this.#activeFrame = activeFrame;
  }



  #newAction(actionList, options){
    const {type, toolGroup, toolName} = actionList;
    const {before, after} = options;
    this.#actionList = {
      activeFrame: this.#activeFrame,
      activeLayer: this.#activeLayer,
      type: type,
      toolGroup: toolGroup,
      toolName: toolName,
      actions: []

    }


  }

  #modifyData = (x,y,c)=>{
    this.#pixelDocument.drawPixel(x,y,c);
  }

  Tool(actionList, options){
    // console.log(actionList)
    if(this.#actionList == null){
      if(actionList.toolGroup == "canvasDraw" && options.before == undefined){
        options.before = this.getOldColor(actionList.pixels[0].x,actionList.pixels[0].y);
      }
      this.#newAction(actionList, options);
    }
    this.#pixelDocument.drawPixelList(actionList.pixels, options, actionList.toolName);
    this.#Render.renderData(this.#pixelDocument.getImageData(), this.#Render.canvasListEnum.CURRENT)

    // this.#Render.renderPixelList(actionList.pixels, this.#actionList.after, this.#Render.canvasListEnum.CURRENT, this.#modifyData);
    
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