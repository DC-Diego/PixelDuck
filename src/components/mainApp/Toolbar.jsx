import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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



    </div>)
}

export default Toolbar;

