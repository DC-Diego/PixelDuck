import { useState } from 'react';
import '../NewFile.css';
import NewFileConfig from './NewFileConfig';
import NewFileStart from './newFileStart';
import { fileInfo} from '../js/createNewFile';
import { useNavigate } from 'react-router-dom';


export default function NewFile(){
  let [configVisible, setConfig] = useState(false)
  const navigate = useNavigate();

  function createNewFile(name, width, height){
    //status : 0, fileData : null
    fileInfo.status = 0;
    fileInfo.name = name;
    fileInfo.width = width;
    fileInfo.height = height;
    fileInfo.data = null;
    fileInfo.file = null;
    navigate("/PixelDuck/projeto");
  }

  function openFile(){
    const inp = document.createElement("input");
    inp.type="file";
  
    inp.addEventListener("change", ()=>{
      const fileData = inp.files[0];
      const extension = fileData.type;
      if(!["text/html","application/json",`text/plain`].includes(extension)){
        alert("Selecione um arquivo .json ou .txt "+extension);
        return;
      }
      const reader = new FileReader();
      reader.readAsText(fileData);
      reader.addEventListener("load", ()=>{
        fileInfo.status = 1;
        fileInfo.name = null;
        fileInfo.width = null;
        fileInfo.height = null;
        fileInfo.data =null;
        fileInfo.file = (reader.result)
        navigate("/PixelDuck/projeto");

  
      });
      
    });
    inp.click();
  }
  
  return (
    <div className="newFileDiv">
      <NewFileStart btnOpenFile_click={openFile} btnNewFile_click={()=>setConfig(!configVisible)} configVisible={configVisible}/>
      <NewFileConfig createNewFile={createNewFile} btnNewFile_click={()=>setConfig(!configVisible)} configVisible={configVisible}/>
    
    
    </div>);
}