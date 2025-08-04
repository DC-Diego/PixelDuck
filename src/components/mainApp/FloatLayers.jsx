import { Lock } from "lucide-react";
import { fileInfo } from "../../js/main";

function FloatLayers({layerName, img, lock, alpha}){

  const setDivResponse = ()=>{
    const aspectRatio = fileInfo.width/fileInfo.height;
    if(aspectRatio > 1)
      return {width: "30%", aspectRatio: aspectRatio};
    else
      return {height: "80%", aspectRatio: aspectRatio, marginLeft: "15px"};
  }


  return(<div className="layerDiv">
    <img src={img} style={setDivResponse()}/>
    <h1>{layerName}</h1>
    <button className="siconTopBarBtn">
      <Lock className={lock?"jsHidden":""}/>
    </button>
    

  </div>)



}

export default FloatLayers;
