import { useEffect } from "react";
import { useRef } from "react";
import { fileInfo, layerManager } from "../../js/main";
import Canvas from "./Canvas";



function CanvasBase({width, height}){
  
  const RefCanvasBase = useRef(null);
  useEffect(()=>{
    if(RefCanvasBase.current ){
      layerManager.canvasList.forEach((layer)=>{
        RefCanvasBase.current.appendChild(layer.canvas);
      });
    }
  }, [layerManager.canvasList.length]);

  const setDivResponse = ()=>{
    const aspectRatio = width/height;
    if(aspectRatio > 1)
      return {width: "60%", aspectRatio: aspectRatio};
    else
      return {height: "80%", aspectRatio: aspectRatio};
  }

  return (
    <div id="canvasBaseDiv" ref={RefCanvasBase} style={setDivResponse()} onLoad={(e)=>teste(e)} >

    </div>
  );

}

export default CanvasBase;
