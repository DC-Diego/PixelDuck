import { ChevronDown, ChevronUp, Layers } from "lucide-react";
import { useState } from "react";

function Timeline({timelineHidden, setTimelineHidden}){
  const hideTimeline = ()=>{
    const timeline = document.querySelector(".timeline");
    setTimelineHidden(!timelineHidden)

  }


  return (<div className={`timeline ${timelineHidden?"jsTimelineHidden":""}`} >
    
    
    <button id="btnHideTimeline" onClick={()=>hideTimeline()}> 
      <ChevronUp className={!timelineHidden?"jsHidden":""}/>
      <ChevronDown className={timelineHidden?"jsHidden":""}/>
      
    </button>
    <h1>Time line</h1>

  </div>)


}

export default Timeline;
