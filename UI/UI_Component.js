class UI_Component{
  constructor(root){
    this.root = root;
    this._listeners = [];

  }

  //ADD Event listeners
  on(target, event, handler, options){
    target.addEventListener(event, handler, options);
    this._listeners.push({target, event, handler, options});
    console.log(target)
  }


  destroy(){
    this._listeners.forEach(({ target, event, handler, options })=>{
      target.removeEventListener(event, handler, options);
    });
    this._listeners= [];
    this.root = null;

  }
}

export { UI_Component };
