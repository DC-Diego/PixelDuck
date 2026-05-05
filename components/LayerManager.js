import { UI_Component } from "../UI/UI_Component.js";
import { LayerComp } from "../UI/LayerComp.js";
import { GroupLayer } from "../UI/GroupLayer.js";
import { Layer } from "../core/Layer.js";


export class LayerManager extends UI_Component{

  static #totalLayers = 0;
  #activeLayerID;  
  #orchestratorFuncs; #layersDom = []; 
  #layerData = []; #renderableLayers=[];
  #isCtrlPressed = false; #inactiveLayers = 0;
  #LAYER_SIZE = 50; #JSDRAG = null;
  #LayerSliderProps;
  #Groups = [null];
  #Selected_Group = 0;
  constructor(root, orchestratorFuncs){
    super(root);

    this.#LayerSliderProps = {
      dragging: null,
      target: -1,
      destiny: -1
    };
    this.#orchestratorFuncs = orchestratorFuncs;
    this.#activeLayerID = 0;

    this.on(document, "keydown", this.#documentKey);
    this.on(document, "keyup", this.#documentKey);
    
    this.on(this.root, "pointerdown", ()=>{ this.#Selected_Group =0  });
    this.on(this.root, "dragover", this.#dragoverContainer);

  }

  #dragstartLayer = (e, i)=>{
    console.error("SELECIONAR TEXTO CAUSA ERRO")
    this.#LayerSliderProps.dragging = e.target;
    this.#LayerSliderProps.target = i
    this.#LayerSliderProps.destiny = -1;
    console.log(e)
    setTimeout(()=>e.target.style.display = 'none',10);
    
  }
  #dragendLayer = (e)=>{
    this.#LayerSliderProps.dragging = null;
    e.target.style.display = 'flex';
    this.#JSDRAG?.classList.remove('JSLayerDragging');
    this.#JSDRAG = null;
    if(this.#LayerSliderProps.target == -1 || this.#LayerSliderProps.destiny==-1) return;

    if(this.#LayerSliderProps.target < this.#LayerSliderProps.destiny){
      this.#LayerSliderProps.destiny -=1;
    } 
    this.reorderLayers(this.#LayerSliderProps.target, this.#LayerSliderProps.destiny);
    this.#orchestratorFuncs.updateActiveLayer(this.#LayerSliderProps.destiny);
    this.getActiveLayerData().group = this.#Selected_Group;
    this.#LayerSliderProps.target = -1;
    this.#renderLayers();

  }

  #dragoverContainer = (e) => {
    // this.#LayerSliderProps.dragging.style.display = 'none';
    e.preventDefault();
  }


  #documentKey = (e)=>{
    switch (e.key) {
      case 'Control':
        this.#isCtrlPressed = (e.type=="keydown")?true:false;
        break;
    
      default:
        break;
    }

  }

  reorderLayers = (position, destiny)=>{
    console.log(position, destiny)
    const item = this.#renderableLayers.splice(position,1)[0];
    this.#renderableLayers.splice(destiny,0, item);
    console.log(this.#renderableLayers)
   
  }

  setActiveLayer = (i)=>{
    this.deSelectAllLayers();
    this.#activeLayerID = i;  
    this.selectLayer(i);
    document.querySelector('.layer.active')?.classList.remove('active');
    this.#layersDom[this.getPosition()].root.classList.add('active');
  }


  getPosition(){
    return this.#renderableLayers[this.#activeLayerID].position;
  }

  setLayersData = (data)=>{
    for(let i =0; i < this.#layerData.length;i++){
      const e = this.#layerData[i];
      e.setData(data[i]);
    }
  }

  getData(){
    return this.getActiveLayerData().data;

  }

  deSelectAllLayers = ()=>{
    this.#renderableLayers.forEach((e,j)=>{
      let i =e.position;
      this.#layersDom[i].root.classList.remove("selected");
      this.#layerData[i].setSelection(false);
    });
  }

  selectLayer = (position)=>{
    if(position < 0) return
    this.#layersDom[this.#renderableLayers[position].position].root.classList.toggle("selected");
    this.#layerData[this.#renderableLayers[position].position].toggleSelection();

  }

  #rmLayer =(i)=>{
    this.#inactiveLayers++;
    this.#renderableLayers[i].isRenderable = false;
    this.reorderLayers(i, LayerManager.#totalLayers);
    return i;
  }

  removeLayer = ()=>{
    let tempActive =  this.#activeLayerID; 
    for (let j = LayerManager.#totalLayers-1-this.#inactiveLayers; j >=0; j--) {
      const e = this.#renderableLayers[j];
      if(!e.isRenderable) continue
      let i = e.position;
      if(this.#layerData[i].isSelected){
        this.#rmLayer(j);
        if(tempActive > 0)tempActive--;
      }
    }
    this.#orchestratorFuncs.updateActiveLayer(tempActive);
    this.#renderLayers();
  }


  #dpLayer = (i)=>{
    let j = this.#renderableLayers[i].position;
    const name = this.#layerData[j].getName();
    this.#crLayer(i+1).setName(`${name} (copy)` );
    j = this.#renderableLayers[i+1].position;
    this.#layersDom[j].setLayerData(this.#layerData[j]);
    return i+1;
  }


  duplicateLayer = (position, duplicateFunc)=>{
    let qtd = 0;
    let active = -1;
    for (let j = LayerManager.#totalLayers-1-this.#inactiveLayers; j >=0; j--) {
      const e = this.#renderableLayers[j];
      if(!e.isRenderable) { continue }
      let i = e.position;
      if(this.#layerData[i].isSelected){
        this.#Selected_Group = this.#layerData[i].group;
        this.#dpLayer(j);
        if(active == -1) active = j;
        duplicateFunc(j);
        qtd++;
      }
    }
    if(active!=-1){
      this.#orchestratorFuncs.updateActiveLayer(active+qtd);
      this.#renderLayers();
    }
    return qtd;
  }
  
  // Copy - Backup
  // duplicateLayer = (position)=>{
  //   const name = this.getActiveLayerData().getName();
  //   this.createLayer(position).setName(`${name} (copy)` );
  //   this.#layersDom[this.getPosition()].setLayerData(this.getActiveLayerData());
  // }

  toggleGroupVisible = (groupId, isVisible)=>{
    this.#renderableLayers.forEach(e=>{
      let i =e.position;
      if(this.#layerData[i].group == groupId){
        this.#layersDom[i].setVisible(isVisible);
      }
    });
  }
  
  groupLayers = ()=>{
    const group = new GroupLayer({toggleGroupVisible: this.toggleGroupVisible},(e)=>{
      e.preventDefault();
      e.stopPropagation();
      this.#Selected_Group = 0;
      this.#LayerSliderProps.destiny = group.getBottomLayer().renderableOrder; 
    }, (e)=>{
      e.preventDefault();
      e.stopPropagation();
      this.#Selected_Group = 0;
      this.#LayerSliderProps.destiny = group.getRepresentative().renderableOrder+1
    }); 
    // group.root

    group.on(group.root, "dragover", (e)=>{
      e.preventDefault(); 
      if(this.#JSDRAG) this.#JSDRAG.classList.remove("JSLayerDragging")
      this.#JSDRAG = group.root;
      this.#JSDRAG.classList.add("JSLayerDragging");
  
    })

    
    
    let lastNode = -1;

    for (let j = LayerManager.#totalLayers-1-this.#inactiveLayers; j >=0; j--) {
      const e = this.#renderableLayers[j];
      if(!e.isRenderable) continue
      let i = e.position;
      if(this.#layerData[i].isSelected){
        if(lastNode == -1){
          lastNode = j;
          group.setRepresentative(e);
        }else{
          lastNode = lastNode-1;
          this.reorderLayers(j, lastNode);
        }
        this.#layerData[i].group = group.getId();
      }
    }
    this.#Groups.push(group);
    this.deSelectAllLayers();
    this.#Selected_Group = group.getId();
    this.#orchestratorFuncs.updateActiveLayer(group.getRepresentative().renderableOrder);
    this.#renderLayers();
  }


  #crLayer = (position)=>{
    const id = LayerManager.#totalLayers;
    const layer = new Layer(id, 'Layer '+id, 0);
    this.#layerData.push(layer);
    layer.group = this.#Selected_Group;
    const item = {
      position: id, isRenderable: true, renderableOrder: NaN
    }

    const layerDom = new LayerComp(layer, ()=>{
      this.#LayerSliderProps.destiny = item.renderableOrder; 
    }, ()=>{
      this.#LayerSliderProps.destiny = item.renderableOrder+1
    });
    this.#layersDom.push(layerDom);
    console.log(layer)
    this.#renderableLayers.splice(position,0, item);

    layerDom.root.addEventListener('dragstart', (e)=>{this.#dragstartLayer(e, item.renderableOrder)});
    layerDom.root.addEventListener('dragend', this.#dragendLayer);
    layerDom.root.addEventListener('dragover', (e)=>{
      e.preventDefault(); 
      e.stopPropagation();
      if(this.#JSDRAG) this.#JSDRAG.classList.remove("JSLayerDragging")
      this.#JSDRAG = layerDom.root;
      this.#JSDRAG.classList.add("JSLayerDragging");
      this.#Selected_Group = layer.group;
      // this.#LayerSliderProps.destiny = item.renderableOrder;
    });

    layerDom.root.addEventListener('pointerdown', (e)=>{
      if(this.#isCtrlPressed){
        this.selectLayer(item.renderableOrder);
      }else{
        e.stopPropagation();
        this.#Selected_Group = layer.group;
        this.#orchestratorFuncs.updateActiveLayer(item.renderableOrder);
      }
    });

    LayerManager.#totalLayers++;
    return layer;

  }


  createLayer=(position)=>{
    const layer = this.#crLayer(position); 
    this.#orchestratorFuncs.updateActiveLayer(position);
    this.#renderLayers();
    return layer;
  }

  getActiveLayerData(){
    return this.#layerData[this.getPosition()];
  }

  getOpacity(){
    return this.getActiveLayerData().getOpacity();
  }
  setOpacity(op){
    this.getActiveLayerData().setOpacity(op);
  }

  #renderLayers=()=>{
    this.root.innerHTML = "";
    let previousGroup = 0;
    for (let i = LayerManager.#totalLayers-1; i >=0; i--) {
      const e = this.#renderableLayers[i]
      this.#renderableLayers[i].renderableOrder = i;
      if(!e.isRenderable) continue 
      const j = e.position;
      const layer = this.#layersDom[j].root;

      if(this.#layerData[j].group==0)  this.root.appendChild(layer);
      else{
        const group = this.#Groups[this.#layerData[j].group]; 
        if(this.#layerData[j].group != previousGroup){
          group.clearChildren();
          group.setRepresentative(e);
          this.root.appendChild(group.root);
        } 
        group.setItem(layer);
        group.setBottomLayer(e);
      
      }
      previousGroup = this.#layerData[j].group;
    }
  }

  setTotalLayers = (i)=>{
    return
    LayerManager.#totalLayers = i;
    // this.#orchestratorFuncs.updateTotalLayers(i);

  }
}