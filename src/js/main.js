
import File from './File';
import LayerManager from './LayerManager';
let fileInfo = new File();

if(localStorage.getItem("fileData")){
  fileInfo.loadData(JSON.parse(localStorage.getItem("fileData")))

}
let layerManager = new LayerManager();

const id = Math.floor(Math.random()*100000000).toString(16)+Math.floor(Math.random()*100000000).toString(16)+Math.floor(Math.random()*100000000).toString(16)+Math.floor(Math.random()*100000000).toString(16);

layerManager.addLayer(id);







//status: 
// 0 - Create new file
// 1 - open new file 
// null - Não encontrado

// fileData:
// null - Sem arquivo 

export {fileInfo, layerManager}
