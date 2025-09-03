import {ChevronLeft, Clipboard, Copy, Expand, Fullscreen, Redo, ScissorsIcon, Square, Undo, ZoomIn, ZoomOut} from "lucide-react"
import { useState } from "react";
import logoPixelDuck from "../../assets/logoPixelDuck.png"
function Topbar({undo, redo}){
  let [zoomSize, setZoomSize] = useState(100);

  const Zoom = (op)=>{
    const canvasBaseDiv = document.getElementById("canvasBaseDiv");
    let calc = Math.floor(zoomSize*Math.pow(1.1, op));
    calc=calc>1000?1000:(calc<25)?25:calc;
    setZoomSize(calc);
    canvasBaseDiv.style.scale=calc/100;


  }

  return (<div className="topBar"> 
    {/* <div className="contentTopBar">
      <button className="iconTopBarBtn"><img src={logoPixelDuck} alt="" /></button>
    </div> */}
    <div className="contentTopBar">
      <button className="iconTopBarBtn"><ChevronLeft /></button>
      <button className="iconTopBarBtn"> Salvar</button>
      <button className="iconTopBarBtn"> Exportar</button>
      

    </div>
    <div className="contentTopBar">
      <button className="iconTopBarBtn" onClick={()=>{undo()}}> <Undo/></button>
      <button className="iconTopBarBtn" onClick={()=>{redo()}}> <Redo/></button>
      <button className="iconTopBarBtn"> <ScissorsIcon/></button>
      <button className="iconTopBarBtn"> <Copy/></button>
      <button className="iconTopBarBtn"> <Clipboard/></button>
    </div>
    <div className="contentTopBar">
      <h1>Zoom:</h1>
      <h1>{zoomSize}</h1>
      <select defaultValue={"100%"}>
        <option value="50%">50%</option>
        <option value="100%">100%</option>
        <option value="200%">200%</option>
        <option value="300%">300%</option>
        <option value="400%">400%</option>
        <option value="500%">500%</option>


      </select>


      <button className="iconTopBarBtn" onClick={()=>Zoom(1)}> <ZoomIn/></button>
      <button className="iconTopBarBtn" onClick={()=>Zoom(-1)}> <ZoomOut/></button>
      <button className="iconTopBarBtn"> <Fullscreen/></button>
      <button className="iconTopBarBtn"> <Expand/></button>
    </div>


  </div>)



} 

export default Topbar

