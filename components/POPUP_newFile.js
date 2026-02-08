
function newFile(){
  const comps = `
    <div style="background-color:red; width: 100px; height: 100px">
      <h1 style="color:white; width: 100px; height: 100px">
  NEW FILE PAGE
      </h1>
    </div>
  `;
  const ar = Math.random();
  const div = document.createElement('div');
  div.classList.add("newFilePopUp");
  div.innerHTML = comps;
  div.querySelector("h1").addEventListener("click", ()=>{
    console.log("Clicado! "+ar);
    div.style.backgroundColor = "#00ff00";
    div.style.height = 100+Math.floor(100*Math.random())+"px";
  })
  
  return div;




}


export {newFile};
