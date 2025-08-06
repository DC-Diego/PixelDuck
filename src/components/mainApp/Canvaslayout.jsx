import { Layers } from "lucide-react";
import { useRef, useState } from "react";
import {fileInfo, history, layerManager} from "../../js/main";
import { getRandomId } from "../../js/utils";

import CanvasBase from "./CanvasBase";
import FloatLayers from "./FloatLayers";
import Toolbar from "./Toolbar";

function CanvasLayout({timelineHidden, width, height}){
  let [showLayerBox, setShowLayerBox] = useState(false);
  let [renderLayers, setRenderLayers] = useState([...layerManager.canvasList])
  
  let [renderCtrl, setRenderCtrl] = useState(false);


  // const externLock = (f)=>{
  //   layerToLock.current = f;
  // }
  const lockLayer = ()=>{
    layerManager.getActiveLayer().lockLayer();
    setRenderLayers([...layerManager.canvasList])
  }
  const newLayer = ()=>{
    const id = getRandomId();
    layerManager.addLayer(id);
    history.newFrameData(id);
    // console.log("EEEGEE "+id)
    setRenderLayers([...layerManager.canvasList])


  }


  
  return(<div className="centerlayoutDiv">
    <Toolbar />
    <CanvasBase width={width} height={height}/>
    <button id="btnLayer" onClick={()=>setShowLayerBox(!showLayerBox)}  style={{bottom: !timelineHidden?"22%":"2%"}}><Layers/></button>
    <div className={`layerBox ${showLayerBox?"":"jsHidden"}`} style={{bottom: !timelineHidden?"30%":"10%"}}>
      <div className="LayerControl">
        <div className="layerControlSection">
          <button onClick={()=>{newLayer()}}>n</button>
          <button>d</button>
          <button>x</button>
          <button onClick={()=>{lockLayer()}}>l</button>
        </div>
        <div className="layerControlSection">
          <h1>alpha</h1>
          <input id=""/>
        </div>
        
        {/*  Botoes criar layer, duplicar, deletar, props etc  */}
      </div>
      <div className="layersContainer">
        {renderLayers.map((e, i) => {
          // console.log(e)
          return <FloatLayers key={e.id} layerName={e.name} img={e.getImage()} lock={e.locked} alpha={e.alpha} id={e.id} />
        })}
      </div>
    </div>
  </div>)
}


export default CanvasLayout;