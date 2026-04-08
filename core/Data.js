import {Frame} from '../components/Frame.js';

class Data{

  #frameData = [];
  constructor(){



  }


  getFrameData(){
    return this.#frameData;

  }

  newFrame(){
    const frame = new Frame();
    this.#frameData.push(frame);
  
  }

  newLayer(){
    for(let i =0;i < this.#frameData.length; i++){
      const frame = this.#frameData[i];
      frame.newLayer();
    }
  }




}

export {Data};