import logoPixelDuck from "../assets/logoPixelDuck.png";


export default function NewFileStart({btnNewFile_click, configVisible,btnOpenFile_click}){


  return (<div id="newFileStart" className={configVisible ?"jsHidden": ""}>
    <div className="newFileLogo">
      <img src={logoPixelDuck} />
      <h1>PIXEL<br />DUCK</h1>
    </div>
    <div className="newFileButton">
      <button id="btnNewFile" onClick={btnNewFile_click}>Novo arquivo</button>
      <button id="btnOpenFile" onClick={()=>btnOpenFile_click()}>abrir arquivo</button>


    </div>


  </div>
  
  );





}