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
    if(actionHistory.length < this.historyMemo){
      this.actionHistory.push(this.action.splice(0, this.action.length));
      this.historyStep++;
    }else{
      this.appendFrameData(this.actionHistory.splice(0,1))
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
  }

  appendFrameData(action){
    //fazer algo com frameData
  }



}


export default History