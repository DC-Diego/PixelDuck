import { UI_Component } from "./UI_Component.js";
import {confirmDialog} from "../POPUP_Confirm.js";

export class ColorPicker extends UI_Component{

  #input;
  #colorPallete;
  constructor(root, colorPallete,callback){
    super(root);
    this.#input = root.querySelector("input");
    this.on(this.#input, "change", callback);

    if(colorPallete){
      this.#colorPallete = root.querySelector("h1");
      this.on(this.#colorPallete, "pointerdown", this.#openColorPallete);
    }

  }

  #openColorPallete=(e)=>{
    const confirm = confirmDialog("Color pallete", "Abre a palheta de cores", ()=>{this.setColor("#fff0ff")});
    document.body.appendChild(confirm);

  }

  setColor(v){
    this.#input.value = v;
  }

}