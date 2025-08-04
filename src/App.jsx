import { useNavigate } from "react-router-dom";
import Topbar from "./components/mainApp/Topbar";
import { fileInfo } from "./js/main";
import "./App.css"
import CanvasLayout from "./components/mainApp/Canvaslayout";
import Timeline from "./components/mainApp/Timeline";
import { useState } from "react";


function App(){
  const navigate = useNavigate();
  let [timelineHidden, setTimelineHidden] = useState(true);
  
  const fileProject = fileInfo;
 
  if(!fileInfo.process()){
    navigate('/PixelDuck/newFile');
    alert("Não foi possivel abrir ou criar o arquivo");
    return
  }else{
    localStorage.setItem("fileData", JSON.stringify(fileProject));
  }

  return (<div className="greater">
    <Topbar />
    <CanvasLayout width={fileProject.width} height={fileProject.height} timelineHidden={timelineHidden} />
    <Timeline timelineHidden={timelineHidden} setTimelineHidden={setTimelineHidden}/>

  
  </div>)


  // return (<h1>status: {fileProject.status}<br/>name: {fileProject.name}<br />width: {fileProject.width}<br/>height: {fileProject.height}<br />Data: {fileProject.data}</h1>)

} 
export default App;