import {newFile} from '../components/POPUP_newFile.js';
const btnNewFile = document.getElementById("btnNewFile");


function renderComponent(parent, child){
  parent.appendChild(child);
}

btnNewFile.addEventListener("click", ()=>{
  const welcomeScreen = document.getElementById("welcomeScreen");
  welcomeScreen.style.display = "none";
  
  const cancel = ()=>{
    welcomeScreen.style.display = "flex";

  }
  const confirm = ()=>{
    welcomeScreen.style.display = "flex";

  }


  renderComponent(document.body, newFile(cancel,confirm));  



});

