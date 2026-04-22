class Frame{

 #frameId; #Layers = []; #image;
  constructor(id, qtdLayers){
    this.#frameId = id;
    // this.#Layers = [];
    this.#image = new Image();
    for(let i =0; i < qtdLayers;i++) this.newLayer()

  }


  setContent(content){
    this.#Layers = JSON.parse(JSON.stringify(content));
  }

  getContent(){
    return this.#Layers;
  }

  duplicateLayer(target){
    let i = JSON.parse(JSON.stringify(this.#Layers[target]));
    this.#Layers.push(i);

  }

  newLayer(){
    let i = this.#frameId+"_"+this.#Layers.length;
    this.#Layers.push([i,i,i]);
  }

}

export {Frame}; 
