import { Eye, EyeOff, Lock, Unlock } from "lucide-react";
import { useRef, useState } from "react";
import { fileInfo } from "../../js/main";
import { layerManager } from "../../js/main";

function FloatLayers({layerName, img, lock, id, selectLayer, lockLayer}){
  const layer = layerManager.getLayerFromId(id);
  let [renameLayer, setRenameLayer] = useState(false);
  let [layerNameState, setLayerNameState] = useState(layerName);
  let [displayName, setDisplayName] = useState(layerName);
  let [hidden, setHidden] = useState(false);
  const btnLock = useRef(null);

  function confirmRename(name){
    const layer = layerManager.getLayerFromId(id);
    layer.name = name;
    setLayerNameState(layer.name);
    setRenameLayer(false);
    setDisplayName(layer.name);
  }
  function cancelRename(){
    setLayerNameState(displayName);
    setRenameLayer(false);
 
  }

  const setDivResponse = ()=>{
    const aspectRatio = fileInfo.width/fileInfo.height;
    if(aspectRatio > 1)
      return {width: "30%", aspectRatio: aspectRatio};
    else
      return {height: "80%", aspectRatio: aspectRatio, marginLeft: "15px"};
  }
  function hideLayer(){
    layer.setHidden(!hidden);
    setHidden(!hidden);
  }
  return(<div className={`layerDiv ${layerManager.activeID===id?"activeLayer":""}`} >
    <button className="siconTopBarBtn" onClick={()=>{
      hideLayer();
    }}>
      <Eye className={hidden?"jsHidden":""}/>
      <EyeOff className={!hidden?"jsHidden":""}/>
    </button>
    <div onClick={()=>{
        selectLayer(id);
      }}>
      <img src={img} style={setDivResponse()} />
      <h1 onDoubleClick={()=>{
        setRenameLayer(!renameLayer);
      }} className={renameLayer?"jsHidden":""} >{displayName}</h1>
      <input className={!renameLayer?"jsHidden":""} type="text" value={layerNameState} onChange={(e)=>{setLayerNameState(e.target.value)}} onKeyDown={(e)=>{
        console.log(e.key)
        switch(e.key){
          case "Escape":
            cancelRename();
            break;
          case "Enter":
            if(layerNameState)
              confirmRename(layerNameState);
            else
              cancelRename();
            break;
        }
      }} />
    </div>
    <button ref={btnLock} className={`siconTopBarBtn ${(lock?"":"jsHidden")}`} onClick={()=>{lockLayer();}}>
      <Lock />
    </button>
    

  </div>)



}

export default FloatLayers;
