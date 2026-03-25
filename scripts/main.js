
import {confirmDialog} from '../components/POPUP_confirm.js';
import {splashScreen} from  '../scripts/splashScreen.js';
import { ComboBox } from '../UI/ComboBox.js';
import { PresetInput } from '../UI/PresetInput.js';
import {Splitter} from  '../UI/Splitter.js';
import {Stepper} from  '../UI/Stepper.js';
import { ToggleReveal } from '../UI/ToggleReveal.js';
import {setActivePage, getActivePage, getActivePageName} from './navigate.js';
import {Timeline} from '../components/Timeline.js';
import {StateManager} from '../core/stateManager.js';
import {Orchestrator} from '../core/orchestrator.js';

const stateManager = new StateManager();
const orchestrator = new Orchestrator(stateManager);

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










const currentFrame = new Stepper(document.getElementById("currentFrame"),1 ,1, true,
  orchestrator.updateCurrentFrame );

const startingFrame = new Stepper(document.getElementById("starterFrame"), 1,1, false, orchestrator.updateStartFrame );

const endingFrame= new Stepper(document.getElementById("endingFrame"), 1,1, false, orchestrator.updateEndFrame);
const onionSkin = new ToggleReveal(document.getElementById("onionSkin"));

const onionSkinOptions = document.getElementById('onionSkinAdvancedOptions');
onionSkinOptions.addEventListener('pointerdown', ()=>{ 
  renderComponent(document.body, confirmDialog('Onion Skin', 'Advanced options'));  
})

const playSpeed= new Stepper(document.getElementById("playSpeed"), 1, 0.85, false);
const loopCombo = new ComboBox(document.getElementById("loopingMode"), ["Play once", "Playback", "Ping-Pong"]);
const FPSinput = new PresetInput(document.getElementById("FPSset"), ["24", "48", "60", "120"]);


//updateMaxFrameControllers
stateManager.subscribe((s)=>{
  currentFrame.setMaxInput(s.totalFrames);
  startingFrame.setMaxInput(s.totalFrames);
  endingFrame.setMaxInput(s.totalFrames);

});

//updateFrameControllers
stateManager.subscribe((s)=>{
  currentFrame.setValue(s.currentFrame);
  startingFrame.setValue(s.startFrame);
  endingFrame.setValue(s.endFrame);

});

//updateFrameControllers
// stateManager.subscribe((s)=>{
//   const { currentFrame, startFrame, endFrame } = s;
  
//   currentFrame.
//   startingFrame 
//   endingFrame

// });

// orchestrator.updateStartFrame();


const timeline = new Timeline(document.getElementById("timeline-viewport") , document.getElementById("frameArea"));


// timeline.setComponents({ currentFrame, startingFrame , endingFrame, onionSkin, onionSkinOptions , playSpeed ,loopCombo , FPSinput });

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
