
import {confirmDialog} from '../components/POPUP_confirm.js';
import  '../scripts/splashScreen.js';



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
/*
renderComponent(document.body, confirmDialog('Titulo lindo', 'Descrição Descrição Descrição Descrição', confirmar, cancelar));

*/
// renderComponent(document.body, newFile());