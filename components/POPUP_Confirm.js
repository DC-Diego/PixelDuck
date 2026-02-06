function confirmDialog(title, description, confirm = ()=>{}, cancel = ()=>{}){
  const innerComp =`
  <h1></h1>
  <p></p>
  <div>
    <button class="cancel-btn">Cancel</button>
    <button class="confirm-btn">confirm</button>
  </div>
  `;
  const div = document.createElement("div");
  div.innerHTML = innerComp;
  div.classList.add('confirmDialog');

  const closePopup = ()=>{
    div.remove();
  }

  div.querySelector("h1").innerText = title;
  div.querySelector("p").innerText = description;
  div.querySelector(".cancel-btn").addEventListener('click', ()=>{
    closePopup();
    cancel();
  });

  div.querySelector(".confirm-btn").addEventListener('click', ()=>{
    closePopup();
    confirm();
  });


  return div;

}

export {confirmDialog};