 class Splitter{

  constructor (handle, container, type){
    this.handle = handle;
    this.container = container;
    this.type = type;
    this.init();
  }

  init(){
    let start;
    let isHolding = false;
    this.handle.addEventListener('pointerdown', ()=>{
      start = {x: this.container.clientWidth,y:this.container.clientHeight};
      isHolding = true;
    });

    document.addEventListener('pointermove', (e)=>{
      if(isHolding){
        if(this.type == 'h'){
          const height = document.body.clientHeight;
          this.container.style.height = `${(height-e.y)}px`;
        }else{
          const width = document.body.clientWidth;
          this.container.style.width = `${width-(e.x)}px`;
          
        }
      }
    })
    document.addEventListener('pointerup', ()=>{
      isHolding = false;
    });

  }









} 
export {Splitter};