import { UI_Component } from "../UI/UI_Component.js";
import { LayerComp } from "../UI/LayerComp.js";
import { Layer } from "../core/Layer.js";


export class LayerManager extends UI_Component{

  static #totalLayers = 0;
  #activeLayerID;  
  #orchestratorFuncs; #layersDom = []; 
  #layerData = []; #renderableLayers=[];
  #isCtrlPressed = false; #inactiveLayers = 0;
  #LAYER_SIZE = 50;
  #LayerSliderProps;
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
    
    this.on(this.root, "dragover", this.#dragoverContainer);


  }

  #dragstartLayer = (e)=>{
    const Top = e.clientY - this.root.offsetTop + this.root.scrollTop;
    this.#LayerSliderProps.dragging = e.target;
    this.#LayerSliderProps.target = LayerManager.#totalLayers -1 -this.#inactiveLayers-Math.floor(Top / this.#LAYER_SIZE);
    this.#LayerSliderProps.destiny = -1;
    
  }
  #dragendLayer = (e)=>{
    if(this.#LayerSliderProps.target == -1 || this.#LayerSliderProps.destiny==-1) return;
    this.#LayerSliderProps.dragging = null;
    document.querySelector(".JSLayerDragging")?.classList.remove('JSLayerDragging');
    e.target.style.display = 'flex';
    this.reorderLayers(this.#LayerSliderProps.target, this.#LayerSliderProps.destiny);
    this.#orchestratorFuncs.updateActiveLayer(this.#LayerSliderProps.destiny);
    this.#LayerSliderProps.target = -1;

  }

  #dragoverContainer = (e) => {
    e.preventDefault();
    const Top = e.clientY - this.root.offsetTop + this.root.scrollTop;
    this.#LayerSliderProps.dragging.style.display = 'none';
    let i = Math.floor(Top / this.#LAYER_SIZE); 
    if (i >= 0 && i < LayerManager.#totalLayers-this.#inactiveLayers) {
      const dt = LayerManager.#totalLayers-1-this.#inactiveLayers-i;
      this.#LayerSliderProps.destiny = dt;
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

    this.#renderLayers();
  }

  



  setActiveLayer = (i)=>{
    this.getActiveLayerData().toggleSelection();
    this.#activeLayerID = i;  
    this.getActiveLayerData().toggleSelection();
    document.querySelector('.layer.active')?.classList.remove('active');
    // i = this.#renderableLayers[i].position;
    this.#layersDom[this.getPosition()].root.classList.add('active');
    document.querySelectorAll(".layer.selected").forEach(e=>{
      e.classList.remove("selected");
    });
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



  removeLayer = ()=>{
    this.#inactiveLayers++;

    this.#renderableLayers[this.#activeLayerID].isRenderable = false;
    this.reorderLayers(this.#activeLayerID, LayerManager.#totalLayers);
    this.#orchestratorFuncs.updateActiveLayer(   this.#activeLayerID > 0?this.#activeLayerID-1:0   );

  }



  duplicateLayer = (position)=>{
    const name = this.getActiveLayerData().getName();
    this.createLayer(position).setName(`${name} (copy)` );
    this.#layersDom[this.getPosition()].setLayerData(this.getActiveLayerData());
  }



  createLayer=(position)=>{
    const id = LayerManager.#totalLayers;
    const layer = new Layer(id, 'Layer '+id, 0);
    const layerDom = new LayerComp(layer);
    this.#layerData.push(layer);
    
    const item = {
      position: id, isRenderable: true, renderableOrder: NaN
    }
    this.#layersDom.push(layerDom);

    this.#renderableLayers.splice(position,0, item);

    layerDom.root.addEventListener('dragstart', this.#dragstartLayer);
    layerDom.root.addEventListener('dragend', this.#dragendLayer);

    layerDom.root.addEventListener('pointerdown', ()=>{
      if(this.#isCtrlPressed){
        layerDom.root.classList.toggle("selected");
        layer.toggleSelection();
      }else{
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
    this.root.innerHTML = "";
    for (let i = LayerManager.#totalLayers-1; i >=0; i--) {
      const e = this.#renderableLayers[i]
      this.#renderableLayers[i].renderableOrder = i;
      if(!e.isRenderable) continue 
      const j = e.position;
      const layer = this.#layersDom[j].root;
      this.root.appendChild(layer);
    }
  }


  setTotalLayers = (i)=>{
    return
    LayerManager.#totalLayers = i;
    // this.#orchestratorFuncs.updateTotalLayers(i);

  }




}