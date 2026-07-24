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


  #toRGBA(s){
    const p = [0,0,0,0];
    if(s==null)return p;
    p[0] = parseInt(s.substring(1,3), 16);
    p[1] = parseInt(s.substring(3,5), 16);
    p[2] = parseInt(s.substring(5,7), 16);
    p[3] = parseInt(s.substring(7,9), 16);
    return p;
  }

  #toLinear(m){
    const p = [];
    for(let i = 0 ; i < m.length;i++){
      for(let j = 0 ; j < m[0].length;j++){
        p.push(...this.#toRGBA(m[i][j]));
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

  drawPixel = (x,y,c)=>{
    const rgba = this.#toRGBA(c);
    const id = this.getId(x,y);
    this.#PixelMatrix[id] = rgba[0];
    this.#PixelMatrix[id+1] = rgba[1];
    this.#PixelMatrix[id+2] = rgba[2];
    this.#PixelMatrix[id+3] = rgba[3];

  }


  getColor(x,y){
   
    // this.#reloadRefs();
    const id = this.getId(x,y);
    // console.log(this.#PixelMatrix)

    return  (this.#PixelMatrix[id]).toString(16).padStart(2,'0')+ // RR
            (this.#PixelMatrix[id+1]).toString(16).padStart(2, '0')+ // GG
            (this.#PixelMatrix[id+2]).toString(16).padStart(2, '0')+ // BB
            (this.#PixelMatrix[id+3]).toString(16).padStart(2, '0') // AA
  
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