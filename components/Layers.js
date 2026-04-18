import { UI_Component } from "../UI/UI_Component.js";
import { LayerComp } from "../UI/LayerComp.js";


class Layer{
  #id; #opacity;
  constructor(id, name, group){
    this.#id = id;
    this.name= name;
    this.visible = true;
    this.img = new Image();
    this.isSelected = false;
    this.data = [];
    this.group = group;
    this.#opacity = 100;
    this.isRenderable = true;

  }

  setName(name){
    this.name = name;
  }
  getName(){ return this.name }
  getOpacity(){ return this.#opacity }
  
  setOpacity(op){
    this.#opacity = op;
  }

  toggleVisible=()=>{
    this.visible = !this.visible;
    return this.visible;
  }
  toggleSelection=()=>{
    this.isSelected= !this.isSelected;
    return this.isSelected;
  }
}

export class LayerManager extends UI_Component{

  static #totalLayers = 0;
  #activeLayerID;  
  #orchestratorFuncs; #layersDom = []; 
  #layerData = []; #renderableLayers=[];
  #isCtrlPressed = false;

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
  #dragoverContainer = (e) => {
    e.preventDefault();
    const Top = e.clientY - this.root.offsetTop + this.root.scrollTop;
    this.#LayerSliderProps.dragging.style.display = 'none';
    let i = Math.floor(Top / 55); 
    console.log(i)
    if (i >= 0 && i < this.#layersDom.length) {
      this.#LayerSliderProps.destiny = this.#layersDom.length-1-i;
      document.querySelector(".JSLayerDragging")?.classList.remove('JSLayerDragging');
      const layer = this.#layersDom[this.#layersDom.length - i - 1]; 
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

    console.log(position, destiny);
    console.log(this.#renderableLayers);
    const item = this.#renderableLayers.splice(position,1)[0];
    this.#renderableLayers.splice(destiny,0, item);


  }

  
  #dragstartLayer = (e, position)=>{
    this.#LayerSliderProps.dragging = e.target;
    this.#LayerSliderProps.target = position;
    this.#LayerSliderProps.destiny = -1;
    
  }
  #dragendLayer = (e)=>{
    if(this.#LayerSliderProps.target == -1 || this.#LayerSliderProps.destiny==-1) return;
    this.#LayerSliderProps.dragging = null;
    document.querySelector(".JSLayerDragging")?.classList.remove('JSLayerDragging');
    e.target.style.display = 'flex';
    this.reorderLayers(this.#LayerSliderProps.target, this.#LayerSliderProps.destiny);
    // this.#orchestratorFuncs.updateActiveLayer(this.#LayerSliderProps.destiny);
    this.#LayerSliderProps.target = -1;

  }

  setActiveLayer = (i)=>{
    this.getActiveLayerData().toggleSelection();
    this.#activeLayerID = i;  
    this.getActiveLayerData().toggleSelection();
    document.querySelector('.layer.active')?.classList.remove('active');
    this.#layersDom[i].root.classList.add('active');
    document.querySelectorAll(".layer.selected").forEach(e=>{
      e.classList.remove("selected");
    });
  }


  createLayer=(position)=>{
    
    const id = LayerManager.#totalLayers;
    const layer = new Layer(id, 'Layer '+id, 0);
    const layerDom = new LayerComp(layer);
    this.#layerData.push(layer);
    
    const item = {
      position: id, isRenderable: true
    }
    this.#layersDom.push(layerDom);

    this.#renderableLayers.splice(position,0, item);

    layerDom.root.addEventListener('dragstart', (e)=> this.#dragstartLayer(e, position));
    layerDom.root.addEventListener('dragend', this.#dragendLayer);

    layerDom.root.addEventListener('pointerdown', ()=>{
      if(this.#isCtrlPressed){
        layerDom.root.classList.toggle("selected");
        layer.toggleSelection();
      }else{
        this.#orchestratorFuncs.updateActiveLayer(id);

      }

    });
    LayerManager.#totalLayers++;
    
    this.#orchestratorFuncs.updateActiveLayer(position);
    this.#renderLayers();
  }

  getActiveLayerData(){
    return this.#layerData[this.#renderableLayers[this.#activeLayerID].position];
  }

  getOpacity(){
    return this.getActiveLayerData().getOpacity();
  }
  setOpacity(op){
    this.getActiveLayerData().setOpacity(op);
  }

  #renderLayers=()=>{
    this.root.innerHTML = "";
    for (let i = this.#renderableLayers.length-1; i >=0; i--) {
      const e = this.#renderableLayers[i]
      if(!e.isRenderable) return 
      const layer = this.#layersDom[i].root;
      this.#layersDom[i].setLayerData(this.#layerData[e.position]);
      this.root.appendChild(layer);
    }
  }


  setTotalLayers = (i)=>{
    return
    LayerManager.#totalLayers = i;
    // this.#orchestratorFuncs.updateTotalLayers(i);

  }




}