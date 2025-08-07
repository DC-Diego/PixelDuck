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
  
  let [alphaLayer, setAlphaLayer] = useState("");


  const lockLayer = (id = null)=>{
    if(id)
      layerManager.getLayerFromId(id).lockLayer();
    else
      layerManager.getActiveLayer().lockLayer();
    setRenderLayers([...layerManager.canvasList])
  }
  const newLayer = ()=>{
    const id = getRandomId();
    layerManager.addLayer(id);
    history.newFrameData(id);
    setRenderLayers([...layerManager.canvasList])


  }



  const selectLayer = (id)=>{
    layerManager.setActiveID(id);
    setRenderLayers([...layerManager.canvasList]);
    setAlphaLayer(layerManager.getActiveLayer().alpha*100);

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
          <input id="txtAlpha" value={alphaLayer} maxLength={3} onChange={(e)=>{
            if(Number(e.target.value==""?0:e.target.value)+1){
              let v = Number(e.target.value||0);
              v = (v>100)?100:v;
              setAlphaLayer(v);
              layerManager.getActiveLayer().setAlpha(v/100)
            }
          }}/>
        </div>
        
        {/*  Botoes criar layer, duplicar, deletar, props etc  */}
      </div>
      <div className="layersContainer">
        {renderLayers.map((e, i) => {
          // console.log(e)
          return <FloatLayers key={e.id} selectLayer={selectLayer} layerName={e.name} img={e.getImage()} lock={e.locked} alpha={e.alpha} id={e.id} lockLayer={lockLayer} />
        })}
      </div>
    </div>
  </div>)
}


export default CanvasLayout;