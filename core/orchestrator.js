
class Orchestrator {

  constructor(stateManager) {
    this.stateManager = stateManager;
    
  
  }

  updateFPS = (v)=>{
    this.stateManager.setState({fps: v});
    console.log(v)
  }

  updateSpeed = (v)=>{
    this.stateManager.setState({speed: v});
  }

  updateLoopingType = (v)=>{
    this.stateManager.setState({loopingType: v});
  }

  updateTotalFrames = (v)=>{
    this.stateManager.setState({totalFrames: v});
  }

  updateCurrentFrame = (v)=>{
    this.stateManager.setState({currentFrame: v});
  }

  updateStartFrame = (v)=>{
    const e = this.stateManager.getState().endFrame;
    if(v > e){
      this.stateManager.setState({startFrame: v, endFrame: v});
    }
    this.stateManager.setState({startFrame: v});
  }
  updateEndFrame = (v)=>{
    const s = this.stateManager.getState().startFrame;
    if(v < s){
      this.stateManager.setState({startFrame: v, endFrame: v});
    }
    this.stateManager.setState({endFrame: v});
  }

}


export {Orchestrator}

