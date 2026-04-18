class Frame{

 #frameId; #Layers = []; #image;
  constructor(id, qtdLayers){
    this.#frameId = id;
    // this.#Layers = [];
    this.TEMPORARIO = id;
    this.#image = new Image();
    for(let i =0; i < qtdLayers;i++) this.newLayer()

  }

  getContent(){
    return this.TEMPORARIO;
    // return this.#Layers;
  }

  setContent(content){
    this.TEMPORARIO = content;
    // content.forEach(e=>{
      // this.#Layers.push(e);

    // })

  }

  getFrame(){
    return this.#Layers;
  }

  newLayer(){
    let i = this.#frameId+"_"+this.#Layers.length;
    this.#Layers.push([i,i,i]);


  }

}

export {Frame}; 
