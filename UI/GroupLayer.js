import { UI_Component } from "./UI_Component.js";



export class GroupLayer extends UI_Component{
  static qtd = 1;
  #id; #orchestratorFuncs; #groupRepresentative = null; 
  constructor(ofunc){  
    super(document.createElement("div"));
    this.#id = GroupLayer.qtd++;
    this.root.classList.add("group-layer");
    this.root.innerHTML=`
    <div class="group-layer-props">
      <button class="show-content" style="margin: 0; align-items: center; width: 20px; display: flex; padding: 0;" >
        <svg class="toggle-icon" viewBox="0 0 24 24" style="scale: 0.8;">
          <line x1="16" y1="19" x2="8" y2="12"></line>
          <line x1="16" y1="5" x2="8" y2="12"></line>
        </svg>
      </button>
      <button class="group-eyes" style="margin: 0; width: 25px; padding-left: 0px; padding-right: 0; margin-left: 2px;">
        <svg viewBox="0 0 16 16" style="width: 90%; height: 90%; margin-top: 1px;"  >
        <use  href="./sources/svg/eye.svg" ></use> 
        <use class="hidden" href="./sources/svg/eyeClose.svg" ></use> 
      </svg></button>
      <h1 class="hidden9" > Group ${this.#id}</h1>
      <input class="hidden" value="Group ${this.#id}">
    </div>
  `;

    this.GroupLayersArea = document.createElement("div");
    this.GroupLayersArea.classList.add("group-layer-content");
    this.GroupLayersArea.classList.add("hidden");
    
    this.root.appendChild(this.GroupLayersArea);

    this.h1 = this.root.querySelector("h1");
    this.input = this.root.querySelector("input");
    this.btnVisible = this.root.querySelector(".group-eyes");
    this.btnContent = this.root.querySelector(".show-content");

    this.clickTimeout = null;
  
    
    this.name = "Group"+this.#id;
    this.display = false;
    this.visible = true;
    this.#orchestratorFuncs = ofunc;
    this.lock = false;


    this.on(this.btnVisible, "pointerdown",this.btnVisiblePointerDown );
    this.on(this.btnContent, "pointerdown",this.btnContentPointerDown );
    this.on(this.input, "blur",this.cancelName );
    this.on(this.input, "keydown",this.inputKeyDown );
    this.on(this.h1, "pointerdown",this.h1PointerDown );

    // return this.#id;
  }

  setItem = (item)=>{
    this.GroupLayersArea.appendChild(item);
  }
  getId(){ return this.#id; }

  setRepresentative = (renderableLayer)=>{
    this.#groupRepresentative = renderableLayer;
    this.lock = true;
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

  setVisibility = (v)=>{
    this.visible = v;
    const use = this.btnVisible.querySelectorAll('use'); 
    use[v?1:0].classList.add("hidden")
    use[v?0:1].classList.remove('hidden');
    this.#orchestratorFuncs.toggleGroupVisible(this.#id, v);
  }

  btnVisiblePointerDown = (f)=>{
    f.stopPropagation();
    this.setVisibility(!this.visible);
  }

  btnContentPointerDown = ()=>{
    this.display = !this.display;
    this.GroupLayersArea.classList.toggle("hidden");
  }

  #setInputValue = (val)=>{
    this.input.value = val;

  }
  #setH1Value = (val)=>{
    this.h1.innerText = val;
  }

  updateName=()=>{
    this.name = this.input.value;
    this.cancelName();
  }
  cancelName=()=>{
    this.#setInputValue(this.name);
    this.#setH1Value(this.name);
    this.h1.classList.remove("hidden");
    this.input.classList.add("hidden");
  }


}
