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
  #LAYER_SIZE = 50;
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

  #dragstartLayer = (e)=>{
    const Top = e.clientY - this.root.offsetTop + this.root.scrollTop;
    this.#LayerSliderProps.dragging = e.target;
    this.#LayerSliderProps.target = LayerManager.#totalLayers -1 -this.#inactiveLayers-Math.floor(Top / this.#LAYER_SIZE);
    this.#LayerSliderProps.destiny = -1;
    console.log("DRAG - ", this.#LayerSliderProps.target);
  }
  #dragendLayer = (e)=>{
    if(this.#LayerSliderProps.target == -1 || this.#LayerSliderProps.destiny==-1) return;
    this.#LayerSliderProps.dragging = null;
    document.querySelector(".JSLayerDragging")?.classList.remove('JSLayerDragging');
    e.target.style.display = 'flex';
    this.reorderLayers(this.#LayerSliderProps.target, this.#LayerSliderProps.destiny);
    this.#orchestratorFuncs.updateActiveLayer(this.#LayerSliderProps.destiny);
    this.getActiveLayerData().group = this.#Selected_Group;
    this.#LayerSliderProps.target = -1;
    this.#renderLayers();

  }

  #dragoverContainer = (e) => {
    e.preventDefault();
    const Top = e.clientY - this.root.offsetTop + this.root.scrollTop;
    this.#LayerSliderProps.dragging.style.display = 'none';
    let i = Math.floor(Top / this.#LAYER_SIZE); 
    if (i >= 0 && i < LayerManager.#totalLayers-this.#inactiveLayers) {
      const dt = LayerManager.#totalLayers-1-this.#inactiveLayers-i;
      // this.#LayerSliderProps.destiny = dt;
      document.querySelector(".JSLayerDragging")?.classList.remove('JSLayerDragging');
      i = dt <= this.#LayerSliderProps.target?dt-1: dt;
      const layer = this.#layersDom[i!=-1?this.#renderableLayers[i].position:i]; 
      if (layer && layer.root) {
        layer.root.classList.add("JSLayerDragging");
      }
    }
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
    const item = this.#renderableLayers.splice(position,1)[0];
    this.#renderableLayers.splice(destiny,0, item);
    console.log(position, destiny)
    console.log(this.#renderableLayers)
   
  }

  



  setActiveLayer = (i)=>{
    this.deSelectAllLayers();
    this.#activeLayerID = i;  
    this.getActiveLayerData().toggleSelection();
    document.querySelector('.layer.active')?.classList.remove('active');
    // i = this.#renderableLayers[i].position;
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
    this.#renderableLayers.forEach(e=>{
      let i =e.position;
      this.#layersDom[i].root.classList.remove("selected");
      this.#layerData[i].setSelection(false);
    });
  }

  selectLayer = (position)=>{
    this.#layersDom[this.#renderableLayers[position].position].root.classList.toggle("selected");
    this.#layerData[this.#renderableLayers[position].position].toggleSelection();

  }

  removeLayer = ()=>{
    this.#inactiveLayers++;
    this.#renderableLayers[this.#activeLayerID].isRenderable = false;
    this.reorderLayers(this.#activeLayerID, LayerManager.#totalLayers);
    this.#orchestratorFuncs.updateActiveLayer(   this.#activeLayerID > 0?this.#activeLayerID-1:0   );
    this.#renderLayers();
  }



  duplicateLayer = (position)=>{
    const name = this.getActiveLayerData().getName();
    this.createLayer(position).setName(`${name} (copy)` );
    this.#layersDom[this.getPosition()].setLayerData(this.getActiveLayerData());
  }

  toggleGroupVisible = (groupId, isVisible)=>{
    this.#renderableLayers.forEach(e=>{
      let i =e.position;
      if(this.#layerData[i].group == groupId){
        this.#layersDom[i].setVisible(isVisible);
      }
    });
  }
  
  groupLayers = ()=>{
    const group = new GroupLayer({toggleGroupVisible: this.toggleGroupVisible}); 
    
    let lastNode = -1;

    for (let j = LayerManager.#totalLayers-1; j >=0; j--) {
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
    this.#renderLayers();
  }


  createLayer=(position)=>{
    const id = LayerManager.#totalLayers;
    const layer = new Layer(id, 'Layer '+id, 0);
    const layerDom = new LayerComp(layer);
    this.#layerData.push(layer);
    layer.group = this.#Selected_Group;
    const item = {
      position: id, isRenderable: true, renderableOrder: NaN
    }
    this.#layersDom.push(layerDom);

    this.#renderableLayers.splice(position,0, item);

    layerDom.root.addEventListener('dragstart', this.#dragstartLayer);
    layerDom.root.addEventListener('dragend', this.#dragendLayer);
    layerDom.root.addEventListener('dragover', (e)=>{
      e.preventDefault(); 
      // e.stopPropagation();
      this.#Selected_Group = layer.group;
      this.#LayerSliderProps.destiny = item.renderableOrder;
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
    // return
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
        if(this.#layerData[j].group != previousGroup) this.root.appendChild(group.root);
        group.setItem(layer);
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