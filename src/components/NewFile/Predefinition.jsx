function Predefinition({predefinition, marked, id, onClick }){
  return (<div onClick={()=>onClick(id)} className={`predef ${marked?"predefMark":""}`}>
    <div>
        <p>{predefinition}</p>
    </div>

  </div>);




}

export default Predefinition;
