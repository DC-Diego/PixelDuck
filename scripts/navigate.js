const NAVIGATE_PAGES = {
  NewFilePage: document.getElementById("newFile"),
  WorkSpacePage: document.getElementById("workSpace")


}

let activePage = null;

function setActivePage(name){
  if(activePage)  NAVIGATE_PAGES[activePage].classList.remove('active');
  activePage = name;
  NAVIGATE_PAGES[name].classList.add('active');
}

function getActivePage(){
  return NAVIGATE_PAGES[activePage];
}

function getActivePageName(){
  return activePage;
}

export {setActivePage, getActivePage, getActivePageName}