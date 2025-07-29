import { X } from "lucide-react";
import { useState } from "react";

function NewFileConfig({ configVisible, btnNewFile_click }) {
  let [fileName, setFileName] = useState('');
  let [fileWidth, setWidth] = useState(16);
  let [fileHeight, setHeight] = useState(16);


  return (
    <div id="newFileConfig" className={!configVisible ? "jsHidden" : ""}>
      <div className="newFileConfigmenu">
        <h1>Criar Novo projeto</h1>
        <button onClick={btnNewFile_click}><X /></button>
      </div>
      <div className="configs">
        <div className="configInputs">
          <input placeholder="Nome do arquivo" value={fileName} onChange={(e)=>{
            setFileName(e.target.value);

                
          }} />
          <button className="clearInputButton" onClick={()=>setFileName('')}><X /></button>
          <div className="inputDivs">
            <h1>Dimensões do quadro:</h1>
            <div><h1> Largura</h1><input type={"number"} value={fileWidth} onChange={(e)=>{
              const n = Number((""+e.target.value).toLowerCase().replace("e","").replace(".",""))
              if(n+1)
                setWidth(Math.floor(n));
              
          }} /></div>
            <div><h1> Altura</h1><input type={"number"} value={fileHeight} onChange={(e)=>{
              const n = Number((""+e.target.value).toLowerCase().replace("e","").replace(".",""))
              if(n+1)
                setHeight(Math.floor(n));
              
          }}  /></div>
            <button id="btnSavePredefinition">Salvar nova predefinição</button>
          </div>
          <button id="btnCreateProject">Criar arquivo</button>
        
          <div>
          </div>

        </div>



        <div className="configPredefinitions">


        </div>



      </div>


    </div>)

}

export default NewFileConfig;
