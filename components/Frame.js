class Frame{

  static #frameQtd = 0; #frameId; #Layers; #image;
  constructor(){
    this.#frameId = Frame.#frameQtd;
    Frame.#frameQtd = Frame.#frameQtd+1;
    this.#Layers = [];
    this.#image = new Image();
  }

  getFrame(){
    return this.#Layers;
  }

  newLayer(){
    this.#Layers.push([0,0,0]);


  }

}

export {Frame}; 
