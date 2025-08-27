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

  getActiveDataFrame(){
    return this.projectFrameData.find(e=>e.layerId===this.activeLayer);
  }

  createRay(){
    let myRay = this.getActiveDataFrame().frameData[this.activeFrame]; 
    for(const e of this.actionHistory){
      if(e[0].frame==this.activeFrame && e[0].layer==this.activeLayer){

        myRay = this.createRLE(myRay, e);
      }

    }
    return myRay;
  }



  appendFrameData(action){
    const layer = this.getActiveDataFrame();
    layer.frameData[this.activeFrame] = this.createRLE(layer.frameData[this.activeFrame], action);
   
  }

  createRLE(RLEbase ,actionList){
    const RLE = {RLE: RLEbase}
    const w = fileInfo.width;
    const verifiedPos = new Set();
  
    for (const e of actionList) {
      let {color, x, y} = e.toolprop;
      color +="";
      const i = y*w+x;
      if (verifiedPos.has(i))continue;
      verifiedPos.add(i);
  
      let frame = RLE.RLE;
      let splitColors = frame.split("#").filter(Boolean);
  
      let cursor = 0;
      for (let j = 0; j < splitColors.length; j++) {
        let [c, t] = splitColors[j].split("X");
        t = Number(t);
  
        if (i >= cursor && i < cursor + t) {
          const offset = i - cursor;
  
          const newParts = [];
          if (offset > 0) newParts.push(`${c}X${offset}`);
          newParts.push(`${color.replace("#", "")}X1`);
          if (t - offset - 1 > 0) newParts.push(`${c}X${t - offset - 1}`);
  
          splitColors.splice(j, 1, ...newParts);
          break;
        }
        cursor += t;
      }
  
      const merged = [];
      for (const seg of splitColors) {
        if (!seg) continue;
        if (merged.length) {
          const [lastColor, LastTimes] = merged[merged.length-1].split("X");
          const [color, times] = seg.split("X");
          if (lastColor === color) {
            merged[merged.length-1] = `${lastColor}X${Number(LastTimes)+Number(times)}`;
            continue;
          }
        }
        merged.push(seg);
      }
  
      RLE.RLE = "#" + merged.join("#");
    }
    return RLE.RLE;
  }




}



export default History