import { Layers } from "lucide-react";
import CanvasBase from "./CanvasBase";
import Toolbar from "./Toolbar";

function CanvasLayout({timelineHidden, width, height}){


  return(<div className="centerlayoutDiv">
    <Toolbar />
    <CanvasBase width={width} height={height}/>
    <button id="btnLayer" style={{bottom: !timelineHidden?"22%":"2%"}}><Layers/></button>
  {/* hello :{")"} */}
  </div>)


}


export default CanvasLayout;

