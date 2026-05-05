import { UI_Component } from "./UI_Component.js";

class LayerComp extends UI_Component{
  #layerData;
  constructor(l_data, f_bef, f_aft){
    super(document.createElement("div"));
    this.#layerData = l_data;
    this.root.classList.add("layer");
    this.root.draggable = true;
    this.root.innerHTML = `
    <div class="js-upper-layer-drag"> </div>
    <div class="sub-layer">
    <button class="layer-eye" style="margin: 0; min-width: 40px;  width: 40px;" >
      <svg viewBox="0 0 16 16" style="width: 90%; height: 90%;"  >
        <use href="./sources/svg/eye.svg" ></use> 
        <use class="hidden" href="./sources/svg/eyeClose.svg" ></use> 
      </svg></button>
    <div class="layer-image"><img src="sources/logo.png" alt=""></div>  
    <h1 class="hidden1" > ${this.#layerData.getName()}</h1>
    <input class="hidden" value="${this.#layerData.getName()}" >
    </div>
    <div class="js-bottom-layer-drag"> </div>
  `;
    this.h1 = this.root.querySelector("h1");
    this.input = this.root.querySelector("input");
    this.button = this.root.querySelector("button");
    this.visible = true;
    this.clickTimeout = null;
    
    this.topLayerDrag =  this.root.querySelector(".js-upper-layer-drag");
    this.bottomLayerDrag = this.root.querySelector(".js-bottom-layer-drag");

    this.on(this.button, "pointerdown", this.#buttonPointerDown );
    this.on(this.input, "blur", this.cancelName );
    this.on(this.input, "keydown", this.inputKeyDown );
    this.on(this.h1, "pointerdown", this.h1PointerDown );
    this.on(this.bottomLayerDrag, "dragover", ()=> f_bef() );
    this.on(this.topLayerDrag, "dragover", ()=> f_aft() );
  }

  setLayerData = (layerData)=>{
    this.#layerData = layerData;
    this.#setInputValue(this.#layerData.getName());
    this.#setH1Value(this.#layerData.getName());
  }
  getLayerData = ()=>{
    return this.#layerData;
  }


  inputKeyDown = (e)=>{
    switch(e.key){
      case "Escape":
        this.cancelName();
        break;
      case "Enter":
        this.updateName();
        break;
    }
  }
  h1PointerDown =  (e) => {
    const DOUBLE_CLICK_DELAY = 250;
    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout);
      this.clickTimeout = null;
      this.h1.classList.add("hidden");
      this.input.classList.remove("hidden");
    } else {
      this.clickTimeout = setTimeout(() => {
        this.clickTimeout = null;
      }, DOUBLE_CLICK_DELAY);
    }
  }

  #buttonPointerDown = (f)=>{
    f.stopPropagation();
    this.toggleVisible();
  }

  setVisible = (v)=>{
    this.visible = v;
    this.#layerData.setVisible(v);
    const use = this.button.querySelectorAll('use'); 
    use[v?1:0].classList.add("hidden")
    use[v?0:1].classList.remove('hidden');

  }

  toggleVisible(){
    this.setVisible(!this.visible);
  }

  #setInputValue = (val)=>{
    this.input.value = val;

  }
  #setH1Value = (val)=>{
    this.h1.innerText = val;
  }

  updateName=()=>{
    this.#layerData.setName(this.input.value);
    this.cancelName();
  }
  cancelName=()=>{
    this.#setInputValue(this.#layerData.getName());
    this.#setH1Value(this.#layerData.getName());
    this.h1.classList.remove("hidden");
    this.input.classList.add("hidden");
  }

}

export {LayerComp};