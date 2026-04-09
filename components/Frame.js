class Frame{

 #frameId; #Layers = []; #image;
  constructor(id){
    this.#frameId = id;
    // this.#Layers = [];
    this.TEMPORARIO = id;
    this.#image = new Image();
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
    this.#Layers.push([0,0,0]);


  }

}

export {Frame}; 
