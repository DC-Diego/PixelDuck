import { Trash2, X } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import Predefinition from "./Predefinition";

function NewFileConfig({ configVisible, btnNewFile_click, createNewFile }) {
  let [fileName, setFileName] = useState('');
  let [fileWidth, setWidth] = useState(16);
  let [fileHeight, setHeight] = useState(9);
  let [predefinitions, setPredefinitions] = useState(JSON.parse(localStorage.getItem("predefinitions")) ||["16x9","9x16","16x16","32x32","10x14","14x10","32x18","18x32"]);
  let [mark, setMark] = useState(0)


 


  useEffect(()=>{
    localStorage.setItem('predefinitions', JSON.stringify(predefinitions));

  }, [predefinitions]);

  function updateInputPredef(i){
    setMark(i);
    setWidth( Number(predefinitions[i].split("x")[0])  );
    setHeight( Number(predefinitions[i].split("x")[1])  );
  }
  function setNewPredefinition(){
    const newPred = fileWidth+"x"+fileHeight;
    if(!predefinitions.includes(newPred)){
      setPredefinitions([...predefinitions, newPred]);
      setMark(predefinitions.length)
    }


  }

  function removePredefinition(i){
    if(predefinitions.length-1){
      const newPredefinition = predefinitions.filter((e,j)=> j!==i);
      setPredefinitions(newPredefinition)
      updateInputPredef(i-1)
      
    }
  }

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
            <div><h1> Largura</h1><input min={1} type={"number"} value={fileWidth} onChange={(e)=>{
              const n = Number((""+e.target.value).toLowerCase().replace("e","").replace(".",""))
              if(n+1)
                setWidth(Math.floor(n));
              
          }} /></div>
            <div><h1> Altura</h1><input min={1}type={"number"} value={fileHeight} onChange={(e)=>{
              const n = Number((""+e.target.value).toLowerCase().replace("e","").replace(".",""))
              if(n+1)
                setHeight(Math.floor(n));
              
          }}  /></div>
            <button onClick={()=>setNewPredefinition()} id="btnSavePredefinition">Salvar nova predefinição</button>
          </div>
          <button id="btnCreateProject" onClick={()=>{
            if(!fileName || fileWidth <= 0 || fileHeight <= 0){
              alert("Preencha todos os campos corretamente")
            }else
              createNewFile(fileName, fileWidth, fileHeight);



          }}>Criar arquivo</button>
        
          <div>
          </div>

        </div>



        <div className="configPredefinitions">
          <div>
            <h1>Predefinições </h1>
            <button id="btnRemovePredef" title="Remover predefinição" onClick={()=>removePredefinition(mark)}>
              <Trash2/>
            </button> 
          </div>
          <div className="PredefinitionDiv">
            {predefinitions.map((p, i) => {
              return <Predefinition onClick={updateInputPredef} key={i} id={i} predefinition={p} marked={(i==mark)}/>
            })
            }
          </div>

        </div>



      </div>


    </div>)

}

export default NewFileConfig;
