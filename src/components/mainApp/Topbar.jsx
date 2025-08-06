import {ChevronLeft, Clipboard, Copy, Expand, Fullscreen, Redo, ScissorsIcon, Square, Undo, ZoomIn, ZoomOut} from "lucide-react"
import logoPixelDuck from "../../assets/logoPixelDuck.png"
function Topbar(){

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
      <button className="iconTopBarBtn"> <Undo/></button>
      <button className="iconTopBarBtn"> <Redo/></button>
      <button className="iconTopBarBtn"> <ScissorsIcon/></button>
      <button className="iconTopBarBtn"> <Copy/></button>
      <button className="iconTopBarBtn"> <Clipboard/></button>
    </div>
    <div className="contentTopBar">
      <h1>Zoom:</h1>
      <select defaultValue={"100%"}>
        <option value="50%">50%</option>
        <option value="100%">100%</option>
        <option value="200%">200%</option>
        <option value="300%">300%</option>
        <option value="400%">400%</option>
        <option value="500%">500%</option>


      </select>


      <button className="iconTopBarBtn"> <ZoomIn/></button>
      <button className="iconTopBarBtn"> <ZoomOut/></button>
      <button className="iconTopBarBtn"> <Fullscreen/></button>
      <button className="iconTopBarBtn"> <Expand/></button>
    </div>


  </div>)



} 

export default Topbar

