
import {confirmDialog} from '../components/POPUP_confirm.js';
import {splashScreen} from  '../scripts/splashScreen.js';
import { ComboBox } from '../UI/ComboBox.js';
import { PresetInput } from '../UI/PresetInput.js';
import {Splitter} from  '../UI/Splitter.js';
import {Stepper} from  '../UI/Stepper.js';
import { ToggleReveal } from '../UI/ToggleReveal.js';
import {setActivePage, getActivePage, getActivePageName} from './navigate.js';
import {LayerManager} from '../components/LayerManager.js';
import {Timeline} from '../components/Timeline.js';
import {StateManager} from '../core/stateManager.js';
import {Orchestrator} from '../core/orchestrator.js';
import {Data} from '../core/Data.js';

const stateManager = new StateManager();
const orchestrator = new Orchestrator(stateManager);
const data = new Data();


const timeline = new Timeline(document.getElementById("timeline-viewport") , document.getElementById("frameArea"), { updateCurrentFrame: orchestrator.updateCurrentFrame, reorderFrames: data.reorder });


const layer = new LayerManager(document.getElementById("layer-area") ,  { updateActiveLayer: orchestrator.updateActiveLayer, updateTotalLayers: orchestrator.updateTotalLayers  });



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
const layerOpacity = new Stepper(document.getElementById("opacity"), 1,0.5, true, (e)=>{ 
  layer.setOpacity(e);
  TEMPORARY_SETCANVASOPACITY(e);

});

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
const btnRemoveLayer = document.getElementById("btn-remove-layer");
const btnDuplicateLayer = document.getElementById("btn-duplicate-layer");

const createLayer = (position, totalLayers)=>{
  layer.createLayer(position);
  data.newLayer();
  orchestrator.updateTotalLayers(totalLayers+1);
  
}
const duplicateLayer = (position, totalLayers)=>{
  layer.duplicateLayer(position+1);
  data.duplicateLayer(position);
  orchestrator.updateTotalLayers(totalLayers+1);
  
}

const removeLayer = (totalLayers)=>{
  layer.removeLayer();
  orchestrator.updateTotalLayers(totalLayers-1);

}
btnDuplicateLayer.addEventListener("pointerdown", ()=>{
  const {activeLayer, totalLayers} = stateManager.getState();
  duplicateLayer(activeLayer, totalLayers);
  
});

btnNewLayer.addEventListener("pointerdown", ()=>{
  const {activeLayer, totalLayers} = stateManager.getState();
  createLayer(activeLayer+1, totalLayers);
  
});

btnRemoveLayer.addEventListener("pointerdown", ()=>{
  const {totalLayers} = stateManager.getState();
  removeLayer(totalLayers);
  
});

const btnFrameAfter = document.getElementById("btn-insert-frame-after");
const btnFrameBefore = document.getElementById("btn-insert-frame-before");
const btnDuplicateFrame = document.getElementById("btn-duplicate-frame");
const btnRemoveFrame = document.getElementById("btn-remove-frame");


const createFrame = (position, total, totalLayers)=>{
  const id = data.newFrame(position, totalLayers);
  orchestrator.updateTotalFrames(total+1);
  timeline.createFrames(position, id)
}

const duplicateFrame = (position, total, totalLayers)=>{
  const id = data.duplicateFrame(position, totalLayers);
  orchestrator.updateTotalFrames(total+1);
  timeline.createFrames(position, id)
}

const removeFrame = (position, total)=>{
  data.removeFrame(position);
  data.reorder(position, total-1)
  timeline.removeFrame();
  orchestrator.updateTotalFrames(total-1);
}

createFrame(0,0,0);
createLayer(0,0);


btnRemoveFrame.addEventListener("pointerdown", ()=>{
  const {currentFrame, totalFrames} = stateManager.getState();
  removeFrame(currentFrame, totalFrames);

});

btnDuplicateFrame.addEventListener("pointerdown", ()=>{
  const {currentFrame, totalFrames, totalLayers} = stateManager.getState();
  duplicateFrame(currentFrame+1, totalFrames, totalLayers)  
  orchestrator.updateEndFrame(endingFrame.getValue()+1);
});

btnFrameBefore.addEventListener("pointerdown", ()=>{
  const { currentFrame, totalFrames, totalLayers} = stateManager.getState();
  createFrame(currentFrame, totalFrames, totalLayers);
  orchestrator.updateEndFrame(endingFrame.getValue()+1);
});

btnFrameAfter.addEventListener("pointerdown", ()=>{
  const {currentFrame, totalFrames, totalLayers} = stateManager.getState();
  createFrame(currentFrame+1, totalFrames, totalLayers);
  orchestrator.updateEndFrame(endingFrame.getValue()+1);
});

// TotalFrames
stateManager.subscribe((s)=>{
  timeline.setFrameContainerWidth(s.totalFrames);


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





// layer update 
stateManager.subscribe((s)=>{
  layer.setActiveLayer(s.activeLayer);
  layerOpacity.setValue(layer.getOpacity());
  // TEMPORARY_SETCANVASOPACITY(layer.getOpacity());

  // layer.setTotalLayers(s.totalLayers);


});

function TEMPORARY_SETCANVASOPACITY(op){
  const canvas = document.getElementById("canvasArea");
  canvas.style.opacity = op+"%";

}

// Render + infos
stateManager.subscribe((s)=>{
  timeline.setFrameById(s.currentFrame);
  const canvas = document.getElementById("canvasArea");

  layer.setLayersData(data.getFrameData(s.currentFrame));

  // canvas.innerText = data.getFrameById(s.currentFrame).getContent();
  canvas.innerText = layer.getData();
  // canvas.style.opacity = layer.getOpacity()+"%";
  TEMPORARY_SETCANVASOPACITY(layer.getOpacity());


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
