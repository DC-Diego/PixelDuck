import { fileInfo } from "./main";






class History{
  constructor(projectFrameData = [], historyMemo = 10){
    this.action = [];
    this.actionHistory = [];
    this.projectFrameData = projectFrameData;
    this.historyMemo = historyMemo;
    this.historyStep = 0;
    this.qtdFrames = 1;
    this.activeColor = "#000000";
    this.activeTool = "pencil";
 
    this.activeFrame = 0;
    this.activeLayer = 0;

  } 

  getActiveColor(){
    return this.activeColor;
  }

  undo(){
    if(this.historyStep > 0){
      this.historyStep-=1;
    }
  }
  redo(){
    if(this.historyStep < this.actionHistory.length-1){
      this.historyStep+=1;
    }
  }
  deleteRedo(){
    while(this.actionHistory.length > this.historyStep)
      this.actionHistory.pop();
  }

  renderHistory(){
    return JSON.parse(JSON.stringify(this.actionHistory.slice(0, this.historyStep)))
  }
  appendAction(action){
    const newAction = {
      tool: history.activeTool,
      frame: history.activeFrame,
      layer: history.activelayer,


    }


    this.action.push(action)
  }

  duplicateFrameData(id, id2){
    const e = this.getFrameDataFromId(id);
    if(e){
      const newFrameData = {
        layerId: id2,
        frameData: JSON.parse(JSON.stringify(e.frameData))+" HAHA copy of"+id
      }
      this.projectFrameData.push(newFrameData);
    }
    console.log(this.projectFrameData);
  }
  getFrameDataFromId(id){
    for (let i = 0;i < this.projectFrameData.length; i++) {
      const e = this.projectFrameData[i];
      if(e.layerId===id)
        return e;      
    }
    return null;
  }
  appendHistoryAction(){
    console.log(this.action)
    console.log(this.actionHistory)
    console.log(this.projectFrameData)
    if(this.actionHistory.length < this.historyMemo){
      this.actionHistory.push(this.action.splice(0, this.action.length));
      this.historyStep++;
    }else{
      this.appendFrameData(this.actionHistory.splice(0,1)[0])
      this.actionHistory.push(this.action.splice(0, this.action.length));
    }
  }
  removeFrameData(id){
    this.projectFrameData = this.projectFrameData.filter(a=>a.layerId!==id)
  }
  newFrameData(id){
    const newFrameData = {
      layerId: id,
      frameData: []
    }
    for (let i = 0;i < this.qtdFrames; i++) {
      newFrameData.frameData.push(`#nullX${fileInfo.width*fileInfo.height}`);
    }
    this.projectFrameData.push(newFrameData);
    this.activeLayer = id;
    console.log(this.activeLayer)
  }
// #ffffffX80#ff0000X13#00ff00X42
// ffffffX80 ff0000X13  00ff00X42
// ffffff 80

  encodeFrame(decode){
    const w = fileInfo.width;
    const h = fileInfo.height;
    let encodedString = "";
    let counter = 1;
    let color = decode[0];
    for(let i =1;i<w*h;i++){
      if(color===decode[i])
        counter++;
      else{
        encodedString += color+"X"+counter;
        counter = 1;
        color = decode[i];
      }
    }
    encodedString += color+"X"+counter;
    return encodedString; 


  }


  decodeFrame(encode){
    const decodedFrame = new Array(fileInfo.width*fileInfo.height).fill(null);
    const splitColors = encode.split("#");
    let startIndex = 0;
    for(let i = 0; i < splitColors.length;i++){
      const [color, times] = splitColors[i].split("X");
      decodedFrame.fill("#"+color, startIndex, startIndex+Number(times));
      startIndex += Number(color);
    }
    return decodedFrame;

  }


  appendFrameData(action){
    const layer = this.projectFrameData.find(e=>e.layerId===this.activeLayer);
    console.log(layer)
    const decodedFrame = this.decodeFrame(layer.frameData[this.activeFrame]);
    const w = fileInfo.width;
    action.forEach((e)=>{
      const {color, x,y} =  e.toolprop; 
      decodedFrame[y*w+x] = color;
    });

    console.log(decodedFrame);
    layer.frameData[this.activeFrame] = this.encodeFrame(decodedFrame);
    // console.log();
  }

  newAppender(action){
    const layer = this.projectFrameData.find(e=>e.layerId===this.activeLayer);
    const frame = layer.frameData[this.activeFrame];
    const w = fileInfo.width;
    
    action.forEach((e)=>{
      const {color, x,y} =  e.toolprop; 
      let i = y*w+x;
      const splitColors = frame.split("#").filter(Boolean);
      let rebuildString = "";
      for (let j = 0; j < splitColors.length; j++) {
        const f = splitColors[j];
        const [colorSplit, times] = f.split("X");
        // i = i-Number(f.split("X")[1]); 
        if(i+1 <= Number(times) && colorSplit !== color){
          const newString = "#"+colorSplit+"X"+i+"#"+color+"X1"+"#"+colorSplit+"X"+(times-i-1);
          rebuildString += newString;
          // break;
        }else{
          rebuildString += "#"+f;
          i = i-Number(times);
        }     
      }
    });




  }




}



export default History