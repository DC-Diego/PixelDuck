import { useState } from 'react';
import '../NewFile.css';
import NewFileConfig from './NewFileConfig';
import NewFileStart from './newFileStart';

export default function NewFile(){
  let [configVisible, setConfig] = useState(true)


  function btnNewFile_click(){
    console.log("CLICADO!");

  }

  return (
    <div className="newFileDiv">
      <NewFileStart btnNewFile_click={()=>setConfig(!configVisible)} configVisible={configVisible}/>
      <NewFileConfig btnNewFile_click={()=>setConfig(!configVisible)} configVisible={configVisible}/>
    
    
    </div>);
}