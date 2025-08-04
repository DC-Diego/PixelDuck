import { Layers } from "lucide-react";
import { useState } from "react";
import {fileInfo, layerManager} from "../../js/main";

import CanvasBase from "./CanvasBase";
import FloatLayers from "./FloatLayers";
import Toolbar from "./Toolbar";

function CanvasLayout({timelineHidden, width, height}){
  let [showLayerBox, setShowLayerBox] = useState(false);

  return(<div className="centerlayoutDiv">
    <Toolbar />
    <CanvasBase width={width} height={height}/>
    <button id="btnLayer" onClick={()=>setShowLayerBox(!showLayerBox)}  style={{bottom: !timelineHidden?"22%":"2%"}}><Layers/></button>
    <div className={`layerBox ${showLayerBox?"":"jsHidden"}`} style={{bottom: !timelineHidden?"30%":"10%"}}>
      <div className="LayerControl">
        {/*  Botoes criar layer, duplicar, deletar, props etc  */}
      </div>
      {layerManager.canvasList.map(e => {
        return <FloatLayers layerName={e.name} img={e.getImage()} lock={e.locked} alpha={e.alpha} />
      })}
    </div>
  </div>)
}


export default CanvasLayout;