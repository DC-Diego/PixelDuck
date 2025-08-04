
import { fileInfo } from "./main";

class Layer {
  constructor(id, name, zindex){
    const canvas = document.createElement("canvas");
    canvas.width = fileInfo.width;
    canvas.height = fileInfo.height;
    canvas.style.imageRendering = "pixelated";
    const context = canvas.getContext("2d");
    this.id= id;
    this.name= name;
    this.canvas= canvas;
    this.context= context; 
    this.alpha= 1;
    this.zindex= zindex;
    this.locked= false;

    this.attachEvents();
  }

  attachEvents(){
    this.canvas.addEventListener("click", this.click)

  }
  click = (event)=>{
    console.log(event)
  }

  setZindex(z){
    this.zindex = z;
  }
  renameLayer(name){
    this.name = name;
  }
  
  lockLayer(){
    this.locked = !this.locked; 
  }

  getImage(){
    return this.canvas.toDataURL();
  }
  setAlpha(alpha){
    this.alpha = alpha;
  }
}

class LayerManager{
  constructor(canvasList){
    this.canvasList = canvasList || [];
    this.layerIncrementer = 0;
  }
  addLayer(id){
    const name = "layer "+this.layerIncrementer+1;
    const zindex = this.getHighestZ()+1; 
    const layer = new Layer(id, name, zindex);

    this.canvasList.push(layer);
    this.layerIncrementer +=1; 

  }
  getPositionOfId(id){
    let i = -1;
    this.canvasList.forEach((e,j)=>{
      if(e.id===id){
        i = j;
      }
    });
    return i;
  }
  removeLayer(id){
    this.canvasList.splice(this.getPositionOfId(id),1);
  }
  getOrderedLayers(){
    return [...this.canvasList].sort((a, b) => a.zindex - b.zindex);
  }
  getHighestZ(){
    return Math.max(0, ...this.canvasList.map(layer => layer.zindex)) ;
  }
  
  reorder(id, z){
    const layer = this.canvasList[this.getPositionOfId(id)];
    this.canvasList.forEach((e,i)=>{
      if(e.zindex===z){
        this.canvasList[i].zindex = layer.zindex;
        layer.zindex = z;
      }
    });

  }
}
export default LayerManager;