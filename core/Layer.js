export 

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

  setData = (data)=>{
    this.data = data;
  }

  setName(name){
    this.name = name;
  }
  getName(){ return this.name }
  
  setOpacity(op){
    this.#opacity = op;
  }
  getOpacity(){ return this.#opacity }


  setVisible = (v)=>{
    this.visible = v;
    return this.visible;
  }
  toggleVisible=()=>{
    this.setVisible(!this.visible);
  }


  setSelection = (s)=>{
    this.isSelected = s;


  }
  toggleSelection=()=>{
    this.setSelection(!this.isSelected);
    return this.isSelected;
  }
}