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
  renderHistory(){
    return JSON.parse(JSON.stringify(this.actionHistory.slice(0, this.historyStep)))
  }
  appendAction(action){
    this.action.push(action)
  }
  deleteRedo(){
    while(this.actionHistory.length > this.historyStep)
      this.actionHistory.pop();
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
  newFrameData(id){
    const newFrameData = {
      layerId: id,
      frameData: []
    }
    for (let i = 0;i < this.qtdFrames; i++) {
      newFrameData.frameData.push(`#nullX${fileInfo.width*fileInfo.height}`);
    }
    this.projectFrameData.push(newFrameData);
    console.log(this.projectFrameData);
  }

  appendFrameData(action){
    //fazer algo com frameData
  }



}


export default History