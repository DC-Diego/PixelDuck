
import File from '../js/File';
let fileInfo = new File();

if(localStorage.getItem("fileData")){
  fileInfo.loadData(JSON.parse(localStorage.getItem("fileData")))

}


//status: 
// 0 - Create new file
// 1 - open new file 
// null - Não encontrado

// fileData:
// null - Sem arquivo 

export {fileInfo}
