import {UI_Component} from './UI_Component.js';

class ToggleReveal extends UI_Component{

  constructor(root){
    super(root);
    this.buttonToggler = root.querySelector('.toggle-reveal-js');
    this.containerReveal = root.querySelector('.reveal-container-js');
    this.active = false;

    this.on(this.buttonToggler, 'pointerdown',this.toggleReveal)
  }
  
  toggleReveal = ()=>{
    this.buttonToggler.classList.toggle("active");
    this.containerReveal.classList.toggle("active");



  }





}

export {ToggleReveal};
