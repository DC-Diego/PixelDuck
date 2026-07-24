class Frame{
  // Possui os verdadeiros valores das layers, dentro do atributo '#Layers', onde ficarão os valores da matrix de pixeis compactados
  // A matrix de pixeis UI ficará em outro lugar, como UInt8ClampedArray
  // remover campo "data" da classe layer, pois é dado duplicado tirado dessa classe
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

  getLayer(index){
    return this.#Layers[index];
  }
  
  newLayer(){
    let i = this.#frameId+"_"+this.#Layers.length;
    this.#Layers.push({left: 0, top: 0, data: [i,i,i]});
  }

}

export {Frame}; 
