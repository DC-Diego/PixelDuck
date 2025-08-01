
import { fileInfo } from "./createNewFile";

class LayerManager{
  constructor(){
    this.canvasList = [];
  }

  pushLayer(id){
    // const id = Math.floor(Math.random()*100000000).toString(16)+Math.floor(Math.random()*100000000).toString(16)+Math.floor(Math.random()*100000000).toString(16)+Math.floor(Math.random()*100000000).toString(16);

    const canvas = document.createElement("canvas");
    canvas.width = fileInfo.width;
    canvas.height = fileInfo.height;
    canvas.style.imageRendering = "pixelated";
    const context = canvas.getContext("2d");
    const newLayer = {
      id: id,
      name: "layer "+Math.floor(Math.random()*100).toString(32),
      canvas: canvas ,
      context: context, 
      alpha: 1,
      zindex: this.getHighestZ()+1,
      locked: false
    }
    this.canvasList.push(newLayer);

  }

  getPositionOfId(id){
    let i;
    this.canvasList.forEach((e,j)=>{
      if(e.id===id){
        i = j;
      }
    });
    return i;
  }
  
  renameLayer(id, name){
    const e = this.canvasList[this.getPositionOfId(id)];
    e.name = name;
  }
  removeLayer(id){
    this.canvasList.splice(this.getPositionOfId(id),1);
  }
  lockLayer(id){
    const e = this.canvasList[this.getPositionOfId(id)];
    e.locked = !e.locked; 
  }

  getOrderedLayers(){
    return this.canvasList.sort((a, b) => a.zindex - b.zindex);

  }

  setAlpha(id, alpha){
    const layer = this.canvasList[this.getPositionOfId(id)];
    layer.alpha = alpha;
  }

  getHighestZ(){
    return Math.max([...this.canvasList.map(layer => layer.zindex)]);
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

// git commit -m "Criação dos componentes da página de desenho: Toolbar, topbar, timeline, canvaslayout, canvasBase e Classe  "