
import {confirmDialog} from '../components/POPUP_confirm.js';
import {splashScreen} from  '../scripts/splashScreen.js';

function renderComponent(parent, child){
  parent.appendChild(child);

}

splashScreen();
/*
renderComponent(document.body, confirmDialog('Titulo lindo', 'Descrição Descrição Descrição Descrição', confirmar, cancelar));
*/
// renderComponent(document.body, newFile());
