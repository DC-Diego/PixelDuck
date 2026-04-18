import {Frame} from '../components/Frame.js';

class Data{

  static #frameQtd = 0; // quantidade real de frames
  #frameData = [];
  #renderableFrames = [];
  
  constructor(){
    // this.newFrame(0);
  }

  getFrameById(id){
    const position = this.#renderableFrames[id].position;

    return this.#frameData[position];

  }
  getFrameData(){
    return this.#frameData;

  }


  getPosition(pos){
    return this.#renderableFrames[pos].position;
  }

  removeFrame(position){
    this.#renderableFrames[position].isRenderable = false;
    return position;
  }

  duplicateFrame(position, totalLayers){
    const id = this.newFrame(position, totalLayers);
    this.#frameData[id].setContent( this.#frameData[this.getPosition(position-1)].getContent() );
    return id;
  }

  newFrame(position, totalLayers){
    const id = Data.#frameQtd;
    const frame = new Frame(id, totalLayers);
    this.#frameData.push(frame);
    Data.#frameQtd++;
    this.#renderableFrames.splice(position, 0, {  position: id, isRenderable: true});
    return id;
  }

  // removeFrame(id){
  //   this.#renderableFrames[id].isRenderable = false;
  // }


  newLayer(){
    for(let i =0;i < this.#frameData.length; i++){
      const frame = this.#frameData[i];
      frame.newLayer();
    }
  }

  reorder=(target, destiny)=>{
    console.log(target, destiny, this.#renderableFrames)
    const item = this.#renderableFrames.splice(target,1)[0];
    this.#renderableFrames.splice(destiny,0, item);

  }


}

export {Data};