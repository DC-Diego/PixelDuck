
import File from './File';
import LayerManager from './LayerManager';
import History from './History';
import { getRandomId } from './utils';
let fileInfo = new File();

if(localStorage.getItem("fileData")){
  fileInfo.loadData(JSON.parse(localStorage.getItem("fileData")))

}



let history; 
let layerManager;




function startProject(){
  history = new History(undefined, 10);
  layerManager = new LayerManager();
  
  const id = getRandomId();
  layerManager.addLayer(id);
  history.newFrameData(id);

}



// layerManager.addLayer(getRandomId());
// layerManager.addLayer(getRandomId());
// layerManager.addLayer(getRandomId());
// layerManager.addLayer(getRandomId());
// layerManager.addLayer(getRandomId());
// layerManager.addLayer(getRandomId());
// layerManager.addLayer(getRandomId());
// layerManager.addLayer(getRandomId());
// layerManager.addLayer(getRandomId());
// layerManager.addLayer(getRandomId());
// layerManager.addLayer(getRandomId());
// layerManager.addLayer(getRandomId());
// layerManager.addLayer(getRandomId());
// layerManager.addLayer(getRandomId());
// layerManager.addLayer(getRandomId());





// console.log(layerManager.getActiveLayer())

//status: 
// 0 - Create new file
// 1 - open new file 
// null - Não encontrado

// fileData:
// null - Sem arquivo 

export {fileInfo, layerManager, history, startProject}
