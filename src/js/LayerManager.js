
import { fileInfo } from "./main";
import { history } from "./main";

class CanvasMng{
  constructor(canvas, context){
    this.canvas = canvas;
    this.context = context;
    this.locked= false;
    this.isDrawing = false;
    this.lastPos = {x:null,y:null}
    this.attachEvents();
  }
  lockLayer(){
    this.locked = !this.locked; 
    this.canvas.style.pointerEvents = (this.locked)?"none":"auto";
  }
  draw(x,y, c){
    this.context.beginPath();
    if(history.activeTool=="pencil"){
      this.context.rect(x,y,1,1);
      this.context.fillStyle=c;
      this.context.fill();
    }else{
      this.context.clearRect(x,y,1,1);
    }

    this.lastPos.x=x;
    this.lastPos.y=y;
    console.log()
  }

  connectDraw(x, y){
    const dx = x-this.lastPos.x;
    const dy = y-this.lastPos.y;
    const ease = Math.max(Math.abs(dx),Math.abs(dy));
    for(let i =0;i<=ease;i++){
      const px = Math.round(this.lastPos.x+dx*i/ease);
      const py = Math.round(this.lastPos.y+dy*i/ease);

      if(history.activeTool=="pencil"){
        this.context.rect(px,py,1,1);
        this.context.fill();
      }else{
        this.context.clearRect(px,py,1,1);
      }
    }
    
    this.lastPos.x=x;
    this.lastPos.y=y;

  }


  attachEvents(){
    this.canvas.addEventListener("mousedown", this.mousedown);
    this.canvas.addEventListener("mousemove", this.mousemove);
    this.canvas.addEventListener("mouseup", this.mouseup);

  }

  mousedown = (event)=>{
    switch(event.button){
      case 0:
        if(!this.locked){
          console.log(this.canvas)
          const x = Math.floor(fileInfo.width*event.offsetX/this.canvas.clientWidth);
          const y = Math.floor(fileInfo.height*event.offsetY/this.canvas.clientHeight);
          this.isDrawing = true;
          this.draw(x, y, history.activeColor);
        }
        break;
      case 2:
        console.log("DIREITO")
        break;

    }
    

  }

  mousemove = (event)=>{
    switch(event.button){
      case 0:
        if(this.isDrawing){
          const x = Math.floor(fileInfo.width*event.offsetX/this.canvas.clientWidth);
          const y = Math.floor(fileInfo.height*event.offsetY/this.canvas.clientHeight);
          this.connectDraw(x, y);
        }
        break;
      case 2:
        console.log("DIREITO")
        break;

    }
  }

  mouseup = (event)=>{
    switch(event.button){
      case 0:
        this.isDrawing = false;
        this.context.closePath();

        break;
      case 2:
        console.log("DIREITO")
        break;

    }
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
    this.alpha= 1;
    this.zindex= zindex;
    canvas.style.zIndex=zindex
 
    this.hidden = false;
    this.renderable = true;

   
  }
  setHidden(hidden){
    this.hidden=hidden;
    this.canvas.style.visibility=hidden?"hidden":"visible";
  }

  setZindex(z){
    this.zindex = z;
    this.canvas.style.zIndex=z;
  }
  renameLayer(name){
    this.name = name;
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
    document.querySelector(".activeCanvas")?.classList.remove("activeCanvas");
    this.getActiveLayer().canvas.classList.add("activeCanvas");

  }
  addLayer(id, increment = true){
    const name = "layer "+(this.layerIncrementer+1);
    const zindex = this.getHighestZ()+1; 
    const layer = new Layer(id, name, zindex);

    this.canvasList.push(layer);
    this.layerIncrementer +=(increment)?1:0; 
    this.setActiveID(id);
    // console.log(this.canvasList)

  }
  getLayerFromId(id){
    return this.canvasList[this.getPositionOfId(id)];

  }

  getPositionOfId(id){
    for (let i = 0; i < this.canvasList.length; i++) {
      const e = this.canvasList[i];
      if(e.id===id)
        return i;
    }
  
    return -1;
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
  
  duplicateLayer(id, newId){
    console.log("\n\n\n\na")
    this.zindexUpdate(this.getActiveLayer().zindex+1, 1);
    this.addLayer(newId, false);
    const e = this.canvasList[this.getPositionOfId(id)];
    this.getActiveLayer().renameLayer(e.name+" (copy)");
    this.getActiveLayer().setZindex(e.zindex+1);

  }

  zindexUpdate(start, sum){
    const orderedLayers = this.getOrderedLayers();
    for (let i = start-1; i < orderedLayers.length; i++) {
      const e = orderedLayers[i];
      e.setZindex(e.zindex+sum);
    }


  }

  reorder(id, op){console.log("GE");
    const layer = this.canvasList[this.getPositionOfId(id)];
     if(layer.zindex+op>= 0 && layer.zindex+op <= this.canvasList.length){
      const orderedLayers = this.getOrderedLayers();
      orderedLayers.forEach((e,i)=>{
        if(e.id==id){
          const z = e.zindex;
          e.setZindex(orderedLayers[i+op].zindex);
          orderedLayers[i+op].setZindex(z);
        }
      });
    }

  }
}
export default LayerManager;