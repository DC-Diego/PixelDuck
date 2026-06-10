export class ActionHistory{

  #currentAction = 0;

  //stacktop = historyStack.length
  #stackTop = 0;
  
  maxHistory = 10;
  
  #historyStack = [];

  constructor(){
    this.#historyStack = Array.from(this.maxHistory).fill(null); 
  }


  pushHistory = (actionList)=>{
    if(this.#currentAction < this.#stackTop){
      this.reduceHistory();
    }
    if(this.#currentAction >= this.maxHistory){
      this.dequeueHistory();
    }
    
    const id = this.#currentAction;
    this.#historyStack[id] = actionList;
    this.#currentAction +=1;
    this.#stackTop +=1;
    
    
  }

  // peek from stack
  getCurrentAction=()=>{
    return this.#historyStack[this.#currentAction];
  }

  undo = ()=>{
    if(this.#currentAction > 0){
      const action = this.getCurrentAction();
      this.#currentAction -=1;
      return {
        type: "undo",
        actionList: action
      };
    }
    return null;
  }

  redo = ()=>{
    if(this.#currentAction < this.#stackTop-1){
      const action = this.getCurrentAction();
      this.#currentAction +=1;
      return {
        type: "redo",
        actionList: action
      };
    }
    return null;



  }


  reduceHistory = ()=>{
    this.#historyStack.splice(this.#currentAction+1, this.#stackTop);
    this.#stackTop = this.#currentAction;
  }
  
  dequeueHistory = ()=>{
    this.#historyStack.splice(0,1);
    this.#currentAction -=1;
    this.#stackTop -=1;
  }

  print(){
    console.log(this.#historyStack);
  }

}