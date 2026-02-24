import {newFile} from '../components/POPUP_newFile.js';
import {setActivePage, getActivePage, getActivePageName} from './navigate.js';

function renderComponent(parent, child){
  parent.appendChild(child);
}

function splashScreen(){
  const btnNewFile = document.getElementById("btnNewFile");
  const PAGEnewFile = document.getElementById("newFile");
  

  btnNewFile.addEventListener("click", ()=>{
    const welcomeScreen = document.getElementById("welcomeScreen");
    welcomeScreen.style.display = "none";
    
    const cancel = ()=>{
      welcomeScreen.style.display = "flex";

    }
    const confirm = ()=>{
      welcomeScreen.style.display = "flex";
      setActivePage("WorkSpacePage");
    }

    renderComponent(document.body, newFile(cancel,confirm));  
  });
}

export {splashScreen}
