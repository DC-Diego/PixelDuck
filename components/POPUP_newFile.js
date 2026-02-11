
function newFile(){
  const comps = `
  <div class="popup-header">
    <h1 style="color: white;font-size: 25px;">Novo arquivo</h1>
    <svg class="SVG-closePopup" viewBox="0 0 250 250">
      <line class="lineSVG" x1="75" y1="75" x2="175" y2="175"></line>
      <line class="lineSVG" x1="175" y1="75" x2="75" y2="175"></line>
    </svg>
  </div>
  <div class="newfile-partition-area">
    <div class="newfile-partition" style="flex: 5;">
      <div class="input-label-div" style="margin-top: 15px; width: 85%;">
        <h1> Nome do arquivo:</h1>
        <input placeholder="Nome do arquivo">
      </div>


      <div class="dsdwqd">
        <div class="input-label-div">
          <h1> height:</h1>
          <input class="heightInput" type="number" style="width: 72px;" min="1" value="1" onkeypress="return event.charCode >= 48 && event.charCode <= 57" max="100000">
        </div>
        <svg class="SVG-link " viewBox="0 0 250 250" >
          <rect class="lineSVG" width="100px" height="70" x="15" y="90" rx="12px"/>
          <rect class="lineSVG" width="100px" height="70" x="135" y="90" rx="12px" />
          <line class="lineSVG" x1="90" y1="125" x2="160" y2="125"></line>
        </svg>

        <div class="input-label-div">
          <h1> width:</h1>
          <input class="widthInput" type="number" style="width: 72px;" min="1" value="1" onkeypress="return event.charCode >= 48 && event.charCode <= 57" max="100000">
        </div>


      </div>
      <button class="btnCreateFile" >Criar arquivo</button>

    </div>
    <div class="newfile-partition" style="flex: 7; border-left: 2px solid #ffffff; background-color: black;">

      <div class="preview" style="background: white; width: 50%; height: 50%; display: flex;align-items:center;justify-content: center;">
        Preview
      </div>
    </div>
  </div>
   `;
  const div = document.createElement('div');
  div.classList.add("newFilePopUp");
  div.innerHTML = comps;

  const widthIn = div.querySelector(".widthInput");
  const heightIn = div.querySelector(".heightInput");
  const preview = div.querySelector(".preview");
  const link = div.querySelector(".SVG-link");
  const btnClose = div.querySelector(".SVG-closePopup");
  const btnCreateNewFile = div.querySelector(".btnCreateFile");



  widthIn.value = 32;
  heightIn.value = 32;
  let width = widthIn.value;
  let height = heightIn.value;
  let aspectRatio = 1;
  let isLinkActive = false;

  const closePopup = ()=>{
    div.remove();
  }

  const previewResponsiveness = ()=>{
    aspectRatio = height/width;
    console.log("")
    preview.style.width = `calc(50% * ${aspectRatio})`;
  };

  const linkWidthHeight = (isHeight)=>{
      if(isHeight){
        width = Math.round(height/aspectRatio);
        widthIn.value = width;
      }else{
        height = Math.round(aspectRatio*width);
        heightIn.value = height;
      }
  }

  link.addEventListener("click", ()=>{
    link.classList.toggle("SVG-link-active");
    isLinkActive = !isLinkActive;

  });





  heightIn.addEventListener("change", ()=>{
    height = heightIn.value;
    if(isLinkActive) linkWidthHeight(1);
    previewResponsiveness();
  });
  widthIn.addEventListener("change", ()=>{
    width = widthIn.value;
    if(isLinkActive) linkWidthHeight(0);
    previewResponsiveness();
  });
  btnClose.addEventListener("click", ()=>{
    closePopup();

  });
  btnCreateNewFile.addEventListener("click", ()=>{
    closePopup();

  });




  return div;

}


export {newFile};
