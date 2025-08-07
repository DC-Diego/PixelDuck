import { useState } from "react";
import { ChevronLeft, ChevronRight, Eraser, Pencil } from "lucide-react";
function Toolbar(){

  let [hiddenToolbar, setHiddenToolbar] = useState(false);

  const hideToolbar=()=>{
    const toolbar = document.querySelector(".toolbar");
    setHiddenToolbar(!hiddenToolbar);


  }

  return (<div className={`toolbar ${hiddenToolbar?"jsToolbarHidden":""}`}>
    <button id="btnHideToolbar" onClick={()=>hideToolbar()}>
      <ChevronLeft className={hiddenToolbar?"jsHidden":""} />
      <ChevronRight className={!hiddenToolbar?"jsHidden":""} />
    </button>
    <button>
      <Pencil/>
    </button>
    <button>
      <Eraser/>
    </button>
    <input type="color"/>


    </div>)
}

export default Toolbar;

