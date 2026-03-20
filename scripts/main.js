
import {confirmDialog} from '../components/POPUP_confirm.js';
import {splashScreen} from  '../scripts/splashScreen.js';
import { ComboBox } from '../UI/ComboBox.js';
import { PresetInput } from '../UI/PresetInput.js';
import {Splitter} from  '../UI/Splitter.js';
import {Stepper} from  '../UI/Stepper.js';
import { ToggleReveal } from '../UI/ToggleReveal.js';
import {setActivePage, getActivePage, getActivePageName} from './navigate.js';
import {Timeline} from '../components/Timeline.js';

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



const timelineSplitter = new Splitter (document.getElementById("timeline"), 'h');
const propertiesSplitter = new Splitter (document.getElementById("propertiesPanel"), 'v');

const stepCurrent = new Stepper(document.getElementById("currentFrame"),1 ,1, true);
const stepStart= new Stepper(document.getElementById("starterFrame"), 1,1);
const stepEnd= new Stepper(document.getElementById("endingFrame"), 1,1);

const toggleReveal = new ToggleReveal(document.getElementById("onionSkin"));
const onionSkinOptions = document.getElementById('onionSkinAdvancedOptions');
onionSkinOptions.addEventListener('pointerdown', ()=>{
  renderComponent(document.body, confirmDialog('Onion Skin', 'Advanced options'));  
})

const playSpeed= new Stepper(document.getElementById("playSpeed"), 1, 0.85, false);
const loopCombo = new ComboBox(document.getElementById("loopingMode"), ["Play once", "Playback", "Ping-Pong"]);
const FPS = new PresetInput(document.getElementById("FPSset"), ["24", "48", "60", "120"]);


const timeline = new Timeline(document.getElementById("frameArea"));

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



Timeline.console("Hello");

// setActivePage('NewFilePage');
setActivePage('WorkSpacePage');

splashScreen();
/*
renderComponent(document.body, confirmDialog('Titulo lindo', 'Descrição Descrição Descrição Descrição', confirmar, cancelar));
*/
// renderComponent(document.body, newFile());
