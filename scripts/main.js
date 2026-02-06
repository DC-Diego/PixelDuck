import {newFile} from '../components/POPUP_newFile.js';
import {confirmDialog} from '../components/POPUP_confirm.js';


console.log("Hello, world!");

// document.getElementById("newFile").appendChild(newFile());

function renderComponent(parent, child){
  parent.appendChild(child);

}

let i = 0;


const confirmar = ()=>{
  i++;
  console.log(i);
};

const cancelar = ()=>{
  i--;
  console.log(i);
};

renderComponent(document.body, confirmDialog('Titulo lindo', 'Descrição Descrição Descrição Descrição', confirmar, cancelar));

