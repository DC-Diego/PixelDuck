
import { fileInfo } from "./main";

class CanvasMng{
  constructor(canvas, context){
    this.canvas = canvas;
    this.context = context;
    this.attachEvents();
  }

  attachEvents(){
    this.canvas.addEventListener("click", this.click)

  }
  click = (event)=>{
    console.log(event)
  }


}

class Layer extends CanvasMng{
  constructor(id, name, zindex){
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    super(canvas, context)
    canvas.width = fileInfo.width;
    canvas.height = fileInfo.height;
    canvas.style.imageRendering = "pixelated";
    this.id= id;
    this.name= name;
    // this.canvas= canvas;
    // this.context= context; 
    this.alpha= 1;
    this.zindex= zindex;
    canvas.style.zIndex=zindex
    this.locked= false;
    this.hidden = false;
    this.renderable = true;

   
  }
  setHidden(hidden){
    this.hidden=hidden;
    this.canvas.style.visibility=hidden?"hidden":"visible";
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
    this.canvas.style.opacity=alpha;
  }
}

class LayerManager{
  constructor(canvasList){
    this.canvasList = canvasList || [];
    this.layerIncrementer = 0;
    this.activeID = null;
    this.activeFrame = 0;
    this.activeLayer = 0;
    
  }

  getActiveLayer(){
    return this.canvasList[this.activeLayer];
  }
  setActiveLayer = ()=>{
    this.activeLayer = this.getPositionOfId(this.activeID);

  }

  setActiveID = (id)=>{
    this.activeID = id;
    this.setActiveLayer();
  }
  addLayer(id){
    const name = "layer "+(this.layerIncrementer+1);
    const zindex = this.getHighestZ()+1; 
    const layer = new Layer(id, name, zindex);

    this.canvasList.push(layer);
    this.layerIncrementer +=1; 
    this.setActiveID(id);
    // console.log(this.canvasList)

  }
  getLayerFromId(id){
    return this.canvasList[this.getPositionOfId(id)];

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