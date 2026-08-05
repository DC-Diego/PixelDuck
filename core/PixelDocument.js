import { alphaBlend, mix } from "../Utils/BlendModes.js";
import { toHex, toRGBA } from "../Utils/Conversions.js";

export class PixelDocument {

  #data;

  #activeFrame = 0;
  #activeLayer = 0;

  #activeFrame_ref = null;
  #activeLayer_ref = null;
  #PixelMatrix = null;

  #WIDTH = 0; // cols -> y
  #HEIGHT = 0;

  constructor(data, width, height){
    this.#data = data;
    this.#WIDTH = width;
    this.#HEIGHT = height;
    this.#PixelMatrix = new Uint8ClampedArray(this.#WIDTH*this.#HEIGHT*4);
    // this.#reloadRefs();
  }


  

  #toLinear(m){
    const p = [];
    for(let i = 0 ; i < m.length;i++){
      for(let j = 0 ; j < m[0].length;j++){
        p.push(...toRGBA(m[i][j]));
      }

    }
    return p;
  }


  #setPixelMatrix(layerData){
    // console.log(layerData);
    // this.#PixelMatrix = new Uint8ClampedArray(this.#toLinear(layerData));
  }

  getId(x,y){
    return (y*this.#WIDTH + x)*4;

  }

  drawPixel = (x,y,c, isHex = false)=>{
    const rgba = isHex?toRGBA(c):c;
    const id = this.getId(x,y);
    this.#PixelMatrix[id] = rgba[0];
    this.#PixelMatrix[id+1] = rgba[1];
    this.#PixelMatrix[id+2] = rgba[2];
    this.#PixelMatrix[id+3] = rgba[3];
  }

  drawPixelList = (pixels)=>{
    for(let i =0; i < pixels.length;i++){
      const x = pixels[i].x;
      const y = pixels[i].y;
      // pixels[i].before = this.getColor(x,y);
      
      const result = pixels[i].after; 
      this.drawPixel(x,y,result, false);
    }
  }


  getColor(x,y){
   
    const id = this.getId(x,y);
    return [this.#PixelMatrix[id],// RR
            this.#PixelMatrix[id+1], // GG
            this.#PixelMatrix[id+2], // BB
            this.#PixelMatrix[id+3]] // AA
  }


  getImageData(){
    return new ImageData(this.#PixelMatrix, this.#WIDTH, this.#HEIGHT)

  }

  setActiveFrame(id){
    this.#activeFrame = id;
    this.#reloadRefs();
  }

  setActiveLayer(id){
    this.#activeLayer = id;
    this.#reloadRefs();
  }

  getActiveFrame(){
    return this.#activeFrame;
  }

  getActiveLayer(){
    return this.#activeLayer;
  }

  getPixels(){
    return this.#PixelMatrix;
  }

  getActiveFrame_ref(){
    return this.#activeFrame_ref;
  }

  getActiveLayer_ref(){
    return this.#activeLayer_ref;
  }

  getLayersData(){
    return this.#activeFrame_ref.getContent();
  }

  #reloadRefs(){
    // return
    this.#activeFrame_ref = this.#data.getFrameById(this.#activeFrame);

    this.#activeLayer_ref = this.#activeFrame_ref.getLayer(this.#activeLayer);

    this.#setPixelMatrix(this.#activeLayer_ref.data);

  }
}