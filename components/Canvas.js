import { UI_Component } from "./UI/UI_Component.js";


export class Canvas extends UI_Component{

  #context; #isLocked = false; #color = "#000000";
  #tools;

  isDraw = true;
  isPressing = false;

  constructor(width, height, lock, tools){
    super(document.createElement("canvas"));
    this.root.classList.add("canvas_js");
    this.root.width = width;
    this.root.height = height;
    // this.root.style.imageRendering = "pixelated";
    
    this.root.style.width = width+"px";
    this.root.style.height = height+"px";
    this.root.style.scale = 10;
    
    this.#tools = tools;
    this.#context = this.root.getContext("2d");
    
    this.#context.imageSmoothingEnabled = false;;

    this.on(this.root, "pointerdown", (e)=>{
      this.isPressing = true;
      tools.pointerDown(Math.round(e.offsetX), Math.round(e.offsetY), this) 
    });
    this.on(this.root, "pointermove", (e)=>{
      if(this.isPressing){
        tools.pointerMove(Math.round(e.offsetX), Math.round(e.offsetY), this);
      }
    });
    this.on(this.root, "pointerup", (e)=>{
      this.isPressing = false; 
      tools.pointerUp(Math.round(e.offsetX), Math.round(e.offsetY), this);
    });
    this.on(this.root, "pointerout", (e)=>{
      this.isPressing = false; 
      tools.pointerUp(Math.round(e.offsetX), Math.round(e.offsetY), this);
    });
      
    this.setLocked(lock);


  }

  setColor = (color)=>{
    this.#color = color;
  }

  TEMPORARY_MANAGECLICK = (e)=>{
    if(this.isPressing == false) return
    if(this.isDraw){
      this.draw(Math.floor(e.offsetX), Math.floor(e.offsetY), this.#color);
    }else{
      this.erase(Math.floor(e.offsetX), Math.floor(e.offsetY))
    }

  }


  setLocked = (v)=>{
    if(v){
      this.root.classList.add("canvas-locked");
    }else{
      this.root.classList.remove("canvas-locked");
    }
    this.#isLocked = v;
  }

  getLocked = ()=>{
    return this.#isLocked;
  }

  draw = (x, y, c = "#000000")=>{
    if(x < 0) console.log(x);
    if(y < 0) console.log(y);


    this.#context.beginPath();
    this.#context.rect(x,y,1,1);
    this.#context.fillStyle = c;
    this.#context.fill();
    this.#context.closePath();


  }
  erase = (x, y)=>{
    this.#context.beginPath();
    this.#context.clearRect(x,y,1,1);
    this.#context.closePath();
  }





} 


