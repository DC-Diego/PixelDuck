import { UI_Component } from "../UI/UI_Component.js";

export class Layer extends UI_Component{
  #activeLayer; #totalLayers; #orchestratorFuncs; #layersDom = [];
  constructor(root, orchestratorFuncs){
    super(root);
    this.#orchestratorFuncs = orchestratorFuncs;
    this.#totalLayers = 13;
    this.#activeLayer = 0;
    this.#renderLayers(this.#totalLayers);
  }

  setActiveLayer = (i)=>{
    this.#activeLayer = i;  
    document.querySelector('.layer.active')?.classList.remove('active');
    this.#layersDom[i].classList.add('active');
    console.log(i)
 

  }
  setTotalLayers = (i)=>{
    this.#totalLayers = i;
    // this.#orchestratorFuncs.updateTotalLayers(i);

  }


  #renderLayers=(n)=>{
    for (let i = 0; i < n; i++) {
      const layer = document.createElement("div");
      layer.classList.add("layer");
      if(!i) layer.classList.add("active")
      layer.innerHTML = ` 
        <button class="layer-eye" style="margin: 0; width: 40px;" >
          <svg viewBox="0 0 16 16" style="width: 90%; height: 90%;"  >
            <use href="./sources/svg/eye.svg" ></use> 
            <use class="hidden" href="./sources/svg/eyeClose.svg" ></use> 
          </svg></button>
        <div class="layer-image"><img src="sources/logo.png" alt=""></div>  
        <h1 class="hidden1" > Layer ${i+1}</h1>
        <input class="hidden" value="Layer ${i+1}" >
      `
      
      this.root.appendChild(layer);
      this.#layersDom.push(layer);
      layer.addEventListener('pointerdown', ()=>{
        this.#orchestratorFuncs.updateActiveLayer(i);
      })

      const button = layer.querySelector("button");
      button.addEventListener("pointerdown", (f)=>{
        f.stopPropagation();
        button.querySelectorAll('use').forEach(e=>{
          e.classList.toggle('hidden')
        })

      });
      const h1 = layer.querySelector("h1");
      const input = layer.querySelector("input");
      let clickTimeout = null;
      const DOUBLE_CLICK_DELAY = 300;

      h1.addEventListener("pointerdown", (e) => {
        
        if (clickTimeout) {
          clearTimeout(clickTimeout);
          clickTimeout = null;
          
          h1.classList.add("hidden");
          input.classList.remove("hidden");
        } else {
          clickTimeout = setTimeout(() => {
           

            clickTimeout = null;
          }, DOUBLE_CLICK_DELAY);
        }
      });

    }



  }


}