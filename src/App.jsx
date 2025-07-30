import { useNavigate } from "react-router-dom";
import { fileInfo } from "./js/createNewFile";



function App(){
  const navigate = useNavigate();

  const fileProject = fileInfo;
  fileInfo.process();
  // if(!fileInfo.process()){
  //   navigate('/PixelDuck/newFile');
  //   alert("Não foi possivel abrir ou criar o arquivo");
  //   return

  // } 


  return (<h1>status: {fileProject.status}<br/>name: {fileProject.name}<br />width: {fileProject.width}<br/>height: {fileProject.height}<br />Data: {fileProject.data}</h1>)

} 
export default App;