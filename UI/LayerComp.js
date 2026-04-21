import { UI_Component } from "./UI_Component.js";

class LayerComp extends UI_Component{
  #layerData;
  constructor(l_data){
    super(document.createElement("div"));
    this.#layerData = l_data;
    this.root.classList.add("layer");
    this.root.draggable = true;
    this.root.innerHTML = ` 
    <button class="layer-eye" style="margin: 0; width: 40px;" >
      <svg viewBox="0 0 16 16" style="width: 90%; height: 90%;"  >
        <use href="./sources/svg/eye.svg" ></use> 
        <use class="hidden" href="./sources/svg/eyeClose.svg" ></use> 
      </svg></button>
    <div class="layer-image"><img src="sources/logo.png" alt=""></div>  
    <h1 class="hidden1" > ${this.#layerData.getName()}</h1>
    <input class="hidden" value="${this.#layerData.getName()}" >
  `;
    this.h1 = this.root.querySelector("h1");
    this.input = this.root.querySelector("input");
    this.button = this.root.querySelector("button");
    this.clickTimeout = null;
    

    this.on(this.button, "pointerdown",this.buttonPointerDown );
    this.on(this.input, "blur",this.cancelName );
    this.on(this.input, "keydown",this.inputKeyDown );
    this.on(this.h1, "pointerdown",this.h1PointerDown );
  }

  setLayerData = (layerData)=>{
    this.#layerData = layerData;
    this.#setInputValue(this.#layerData.getName());
    this.#setH1Value(this.#layerData.getName());
    console.log(layerData)

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

  buttonPointerDown = (f)=>{
    f.stopPropagation();
    this.#layerData.toggleVisible();
    this.button.querySelectorAll('use').forEach(e=>{
      e.classList.toggle('hidden')
    })

 

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