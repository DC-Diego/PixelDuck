import Canvas from "./Canvas";

function CanvasBase({width, height}){
  const aspectRatio = width/height;
  return (
    <div id="canvasBaseDiv" style={{aspectRatio: aspectRatio}} >
      <Canvas width={width} height={height} />



    </div>


);



}

export default CanvasBase;
