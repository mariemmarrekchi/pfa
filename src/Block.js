import React,{ useState,useRef } from "react";
import Draggable from "react-draggable";
import Xarrow from 'react-xarrows';
import textfile from "./assets/diff_data_098.txt";
import Badge from 'react-bootstrap/Badge';
const connectPointStyle = {
  position: "absolute",
  width: 15,
  height: 15,
  borderRadius: "50%",
  background: "black"
};
const connectPointOffset = {
  left: { left: 0, top: "50%", transform: "translate(-50%, -50%)" },
  right: { left: "100%", top: "50%", transform: "translate(-50%, -50%)" },
  top: { left: "50%", top: 0, transform: "translate(-50%, -50%)" },
  bottom: { left: "50%", top: "100%", transform: "translate(-50%, -50%)" }
};

const ConnectPointsWrapper = ({ boxId, handler, dragRef, boxRef }) => {
  const ref1 = useRef();

  const [position, setPosition] = useState({});
  const [beingDragged, setBeingDragged] = useState(false);
  return (
    <React.Fragment>
      <div
        className="connectPoint"
        style={{
          ...connectPointStyle,
          ...connectPointOffset[handler],
          ...position
        }}
        draggable
        onMouseDown={e => e.stopPropagation()}
        onDragStart={e => {
          setBeingDragged(true);
          e.dataTransfer.setData("arrow", boxId);
        }}
        onDrag={e => {
          const { offsetTop, offsetLeft } = boxRef.current;
          const { x, y } = dragRef.current.state;
          setPosition({
            position: "fixed",
            left: e.clientX - x - offsetLeft,
            top: e.clientY - y - offsetTop,
            transform: "none",
            opacity: 0
          });
        }}
        ref={ref1}
        onDragEnd={e => {
          setPosition({});
          setBeingDragged(false);
        }}
      />
      {beingDragged ? <Xarrow start={boxId} end={ref1} /> : null}
    </React.Fragment>
  );
};

const boxStyle = {
  border: "1px solid black",
  position: "relative",
  padding: "20px 10px"
};


function Block({ id,text, handler, addArrow, setArrows ,boxId,onDelete}) {
  const [inputs, setInputs] = useState([]);
  const [file, setFile] = useState(null);
  const [Pls,setTabPls]=useState([]);
  const [content, setContent] = useState([]);
  const dragRef = useRef();
  const boxRef = useRef();
  const [name, setName] = useState(`Block ${id}`);
  const [editing, setEditing] = useState(false);

 
  const handleSubmission = (e) => {
    fetch(textfile)
    .then((r) => r.text())
    .then((textContent)  => {
      console.log(textContent)
      // textContent=textContent.replace(',','.')
      setTabPls(textContent.split(","))
      //console.log(textContent);
    })  ;
  console.log(Pls)
        const file=e.target.files[0];
        const reader=new FileReader();
       
        reader.readAsText(file);
        reader.onload=()=>{
            setFile(file.name);
            console.log(reader.result.replace(',','.'))
           
            setContent(reader.result.replace(',','.').split(";"))
        }
        reader.onerror=()=>{
            console.log(reader.error);
        }
       
       
  };
  const addInput = () => {
    setInputs([...inputs, ""]);
  };

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };
  var som=-1;
  for (let index = 0; index < Pls.length; index++) {

    const element = content[index];
    const elemnt1=Pls[index];
    //console.log(elemnt1)
    //console.log(element)
    som+=parseFloat(element).toFixed(4)*parseFloat(elemnt1).toFixed(4);
    //console.log(element*elemnt1);

    //console.log(som);
  //  console.log(parseFloat(element)*parseFloat(elemnt1));
     //console.log(element) 
     //; string
    
    //; string
  
}
// CHANGE NAME FUNCTION 

const handleNameClick = () => {
  setEditing(true);
};

const handleNameChange = (event) => {
  setName(event.target.value);
};

const handleNameBlur = () => {
  setEditing(false);
};


  return (
    <>
    <Draggable
      ref={dragRef}
      onDrag={e => {
        // console.log(e);
        setArrows(arrows => [...arrows]);
      }}
    >
      
      <div
        id={boxId}
        ref={boxRef}
        style={boxStyle}
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          if (e.dataTransfer.getData("arrow") === boxId) {
            console.log(e.dataTransfer.getData("arrow"), boxId);
          } else {
            const refs = { start: e.dataTransfer.getData("arrow"), end: boxId };
            addArrow(refs);
            console.log("droped!", refs);
          }
        }}
      >
       

         <div className="block" id={id}>
          
         <div className="block-header" onClick={handleNameClick}>
        {editing ? (
          <input
            type="text"
            class="form-control col-sm-3"
            value={name}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
          />             

        ) : (
          //name of block
          <h2>{name}</h2>
        )}
        <br/>
        <input type="file" name="fileUpload" class="form-control" onChange={handleSubmission} />
        <br/>

      </div>
      <br/>

      <button class="btn btn-success" onClick={addInput}>Add label</button>
      {inputs.map((input, index) => (
        <input
          key={index}
          value={input}
          onChange={(e) => handleInputChange(index, e.target.value)}
        />
      ))}
      <br/>
            <br/>
            
           <br/>

            <div className="col-sm-4">
  
     <Badge pill bg="primary" className="text-dark">
    <h6>Name file :<span className="text-white">{file}</span></h6>
     {/* <p>{Pls}</p> */}
     <p>length  file <span className="text-white">{content.length}</span></p>
          {/* <p>{content}</p> */}
          <p>Resultat Pls* data :<span className="text-white">{som?som : ""}</span> </p>
          {/* création bloc */}
    </Badge>{' '}
    </div> 
    <br/>
            <br/>
    <button class="btn btn-danger"onClick={onDelete}>delete</button>

    </div>
        
        <ConnectPointsWrapper {...{ boxId, handler, dragRef, boxRef }} />
      </div>
    </Draggable>
    
   </>
  );
}

export default Block;