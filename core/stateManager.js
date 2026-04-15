
class StateManager {
  #listeners;
  constructor() {
    this.state = {
      currentFrame: 0,
      startFrame: 0,
      endFrame: 0,
      totalFrames: 0, // ativos : Agora é o id/FrameQTD do "Data.js"
      loopingType: 0,
      speed: 1,
      fps: 24,
      activeLayer: 0,
      totalLayers: 0,
    }
    this.#listeners = [];

  }


  getState() {
    return this.state;
  }

  setState(patch) {
    this.state = { ...this.state, ...patch };
    this.notify();
  }

  subscribe(fn) {
    this.#listeners.push(fn);
  }

  notify() {
    if(this.#listeners.length)
    this.#listeners.forEach(fn => fn(this.state));
  }
}

export {StateManager}

