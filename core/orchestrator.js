/*
EU DECIDO O QUE ALTERAR, QUANDO ALGO ALTERA, EU SOU CHAMADO, REALIZO AS OPERAÇÔES NECESSARIAS DE MUDANÇAS E INFORMO O STATEMANAGER:

ORCHESTRATOR: 

decide O QUE mudou
ex: currentFrame = 20

EX:

class TimelineOrchestrator {
  constructor(stateManager) {
    this.stateManager = stateManager
  }

  setStartFrame(frame) {
    const state = this.stateManager.getState()

    let current = state.currentFrame
    let end = state.endFrame

    if (current < frame) current = frame
    if (end < frame) end = frame

    this.stateManager.setState({
      startFrame: frame,
      currentFrame: current,
      endFrame: end
    })
  }

  setCurrentFrame(frame) {
    const { startFrame, endFrame } = this.stateManager.getState()

    if (frame < startFrame) frame = startFrame
    if (frame > endFrame) frame = endFrame

    this.stateManager.setState({
      currentFrame: frame
    })
  }
}

*/