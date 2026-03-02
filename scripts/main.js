
import {confirmDialog} from '../components/POPUP_confirm.js';
import {splashScreen} from  '../scripts/splashScreen.js';
import {Splitter} from  '../components/Splitter.js';
import {setActivePage, getActivePage, getActivePageName} from './navigate.js';

function renderComponent(parent, child){
  parent.appendChild(child);

}

document.querySelectorAll(".tool").forEach((e)=>{
  e.addEventListener('click',()=>{
    document.querySelector('.activeTool')?.classList.remove('activeTool');
    e.classList.add('activeTool');
})});


document.getElementById("toggleToolbar").addEventListener('click', ()=>{
  const toolbar = document.getElementById("toolbar");
  const toggleIcon = document.querySelector('.toggle-icon');
  toggleIcon.classList.toggle("rotate");
  toolbar.classList.toggle("hidden");
});

const timelineSplitter = new Splitter (
  document.querySelector(".timeline").querySelector(".splitter"),
  document.querySelector(".timeline"), 'h');

const propertiesSplitter = new Splitter (
    document.getElementById("propertiesPanel").querySelector(".splitter"),
    document.getElementById("propertiesPanel"), 'v');


/*
  const btnStarterFrame =  document.getElementById("timeline-btn-starter-frame");
  const btnPreviousSecond =  document.getElementById("timeline-btn-previous-second");
  const btnPreviousFrame =  document.getElementById("timeline-btn-previous-frame");

  const btnPlayBackward =  document.getElementById("timeline-btn-play-backward");
  const btnPause =  document.getElementById("timeline-btn-pause");
  const btnPlayForward =  document.getElementById("timeline-btn-play-forward");

  const btnNextFrame =  document.getElementById("timeline-btn-next-frame");
  const btnNextSecond =  document.getElementById("timeline-btn-next-second");
  const btnEndingFrame =  document.getElementById("timeline-btn-ending-frame");
    
*/





// setActivePage('NewFilePage');
setActivePage('WorkSpacePage');

splashScreen();
/*
renderComponent(document.body, confirmDialog('Titulo lindo', 'Descrição Descrição Descrição Descrição', confirmar, cancelar));
*/
// renderComponent(document.body, newFile());
