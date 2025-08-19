import { useState } from "react";
import { ChevronLeft, ChevronRight, Eraser, Pencil } from "lucide-react";
import { history } from "../../js/main";
function Toolbar(){

  let [hiddenToolbar, setHiddenToolbar] = useState(false);

  const setActiveTool=(element, toolName)=>{
    history.activeTool=toolName


  }

  const hideToolbar=()=>{
    setHiddenToolbar(!hiddenToolbar);


  }

  return (<div className={`toolbar ${hiddenToolbar?"jsToolbarHidden":""}`}>
    <button id="btnHideToolbar" onClick={()=>hideToolbar()}>
      <ChevronLeft className={hiddenToolbar?"jsHidden":""} />
      <ChevronRight className={!hiddenToolbar?"jsHidden":""} />
    </button>
    <button onClick={(e)=>{setActiveTool(e,"pencil");}}>
      <Pencil/>
    </button>
    <button onClick={(e)=>{
      setActiveTool(e,"eraser");

    }}>
      <Eraser/>
    </button>
    <input type="color" onChange={(e)=>{
      history.activeColor = e.target.value;
    }}/>


    </div>)
}

export default Toolbar;

