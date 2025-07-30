class File{
  constructor(status,name,width,height,data, file){
    this.status = status;
    this.name =name;
    this.width =width;
    this.height =height;
    this.data = data;
    this.file = file;
  }

  loadData(data){
    this.name = data.name;
    this.width = data.width;
    this.height = data.height;
    this.data = data.data;


  }

  process(){
    if(this.status == null){

      return false;
    }
    switch(this.status){
      case 0:
        
        break;
      case 1:
        this.loadData(JSON.parse(this.file))
        break;
    }


    return true;
  }


}



export default File;