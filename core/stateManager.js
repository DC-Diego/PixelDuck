
class StateManager {
  #listeners;
  constructor() {
    this.state = {
      currentFrame: 0,
      startFrame: 0,
      endFrame: 0,
      totalFrames: 60,

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


/*
FONTE DA VERDADE DO PROGRAMA, O QUE É ALTERADO E TUDO O QUE ACONTECE FICA EM MIM, GUARDO O ESTADO ATUAL DO PROGRAMA

🔹 StateManager
guarda o estado

dispara notify


EX:


class StateManager {
  constructor() {
    this.state = {
      currentFrame: 0,
      startFrame: 0,
      endFrame: 100
    }

    this.listeners = []
  }

  subscribe(fn) {
    this.listeners.push(fn)
  }

  setState(partial) {
    this.state = { ...this.state, ...partial }
    this.listeners.forEach(fn => fn(this.state))
  }

  getState() {
    return this.state
  }
}
*/
