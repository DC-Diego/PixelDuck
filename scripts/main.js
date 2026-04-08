
import {confirmDialog} from '../components/POPUP_confirm.js';
import {splashScreen} from  '../scripts/splashScreen.js';
import { ComboBox } from '../UI/ComboBox.js';
import { PresetInput } from '../UI/PresetInput.js';
import {Splitter} from  '../UI/Splitter.js';
import {Stepper} from  '../UI/Stepper.js';
import { ToggleReveal } from '../UI/ToggleReveal.js';
import {setActivePage, getActivePage, getActivePageName} from './navigate.js';
import {Layer} from '../components/Layers.js';
import {Timeline} from '../components/Timeline.js';
import {StateManager} from '../core/stateManager.js';
import {Orchestrator} from '../core/orchestrator.js';
import {Data} from '../core/Data.js';

const stateManager = new StateManager();
const orchestrator = new Orchestrator(stateManager);
const data = new Data();


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
const layersSplitter = new Splitter (document.getElementById("layers"), 'h');



const currentFrame = new Stepper(document.getElementById("currentFrame"),1 ,1, true,
  orchestrator.updateCurrentFrame );

const startingFrame = new Stepper(document.getElementById("starterFrame"), 1,1, false, orchestrator.updateStartFrame );
const layerOpacity = new Stepper(document.getElementById("opacity"), 1,0.5, true  );

const endingFrame= new Stepper(document.getElementById("endingFrame"), 1,1, false, orchestrator.updateEndFrame);
const onionSkin = new ToggleReveal(document.getElementById("onionSkin"));

const onionSkinOptions = document.getElementById('onionSkinAdvancedOptions');
onionSkinOptions.addEventListener('pointerdown', ()=>{ 
  renderComponent(document.body, confirmDialog('Onion Skin', 'Advanced options'));  
})

const playSpeed= new Stepper(document.getElementById("playSpeed"), 1, 0.85, false, orchestrator.updateSpeed);
const loopCombo = new ComboBox(document.getElementById("loopingMode"), ["Play once", "Playback", "Ping-Pong"], orchestrator.updateLoopingType);
const FPSinput = new PresetInput(document.getElementById("FPSset"), ["24", "48", "60", "120"], orchestrator.updateFPS);

playSpeed.setValue(1);

const btnNewLayer = document.getElementById("btn-new-layer");

btnNewLayer.addEventListener("pointerdown", ()=>{
  data.newLayer();
});

const btnFrameAfter = document.getElementById("btn-insert-frame-after");

btnFrameAfter.addEventListener("pointerdown", ()=>{
  data.newFrame();
});



//updateMaxFrameControllers
stateManager.subscribe((s)=>{
  currentFrame.setMaxInput(s.totalFrames-1);
  startingFrame.setMaxInput(s.totalFrames-1);
  endingFrame.setMaxInput(s.totalFrames-1);

});

//updateFrameControllers
stateManager.subscribe((s)=>{
  currentFrame.setValue(s.currentFrame);
  startingFrame.setValue(s.startFrame);
  endingFrame.setValue(s.endFrame);
  timeline.setStartFrame(s.startFrame);
  timeline.setEndFrame(s.endFrame);

});

//loopingType
stateManager.subscribe((s)=>{
  timeline.setLoopingType(s.loopingType);
  playSpeed.setValue(s.speed)

});


const timeline = new Timeline(document.getElementById("timeline-viewport") , document.getElementById("frameArea"), { updateCurrentFrame: orchestrator.updateCurrentFrame  });

const layer = new Layer(document.getElementById("layer-area") ,  { updateActiveLayer: orchestrator.updateActiveLayer, updateTotalLayers: orchestrator.updateTotalLayers  });

// layer update 
stateManager.subscribe((s)=>{
  layer.setActiveLayer(s.activeLayer);
  layer.setTotalLayers(s.totalLayers);


});

// Render + infos
stateManager.subscribe((s)=>{
  timeline.setFrameById(s.currentFrame);
  const canvas = document.getElementById("canvasArea");
  canvas.innerText = timeline.getRenderContent(s.currentFrame);

  document.getElementById("info-qtdFrames-js").innerText=`Quantidade de frames: ${s.totalFrames}`;
  document.getElementById("info-duracao-js").innerText=`Duração: ${Math.floor(s.totalFrames/s.fps*100)/100}s`;


});
stateManager.notify();

/// TEMPORARY ANIMATION CALLER
let intervalId = null;
window.addEventListener('keydown', (e)=>{
  const fps = FPSinput.getActiveValue();
  switch(e.key){
    case ' ': //iniciar
      // console.log(fps);  
      if(intervalId == null){

        intervalId = setInterval(() => {
          timeline.animation();
        }, 1000/(fps*playSpeed.getValue()));
      }else{
        clearInterval(intervalId);
        intervalId = null;
      }
      break;
  }
  // console.log(e.key)

})

/// TEMPORARY ANIMATION CALLER



// setActivePage('NewFilePage');
setActivePage('WorkSpacePage');

splashScreen();
/*
renderComponent(document.body, confirmDialog('Titulo lindo', 'Descrição Descrição Descrição Descrição', confirmar, cancelar));
*/
// renderComponent(document.body, newFile());
