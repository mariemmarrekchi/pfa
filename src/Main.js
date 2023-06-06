import React,{ useState,useRef } from "react";
import Draggable from "react-draggable";
import html2canvas from "html2canvas"
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';
    import Xarrow, {useXarrow, Xwrapper} from 'react-xarrows';
    import Accordion from 'react-bootstrap/Accordion';

    const boxStyle = {border: "grey solid 2px", borderRadius: "10px",padding:"2px",width:"100px"};
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
  

  
  const Box = ({ text, handler, addArrow, setArrows, boxId }) => {
    const dragRef = useRef();
    const boxRef = useRef();
    return (
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
          {text}
          <ConnectPointsWrapper {...{ boxId, handler, dragRef, boxRef }} />
        </div>
      </Draggable>
    );
  };
  
function Main() {
    const [tab,setTab]=useState([])
    const [ele,setEle]=useState("");
    
    const[beingDragged,setBeingDragged]=useState(true)
    const [arrows, setArrows] = useState([]);
  const addArrow = ({ start, end }) => {
    setArrows([...arrows, { start, end }]);
  };
  const handleChange=(e)=>{
    setEle(e.target.value);
    console.log(e.target.value)
    
  }
const hanleAdd=()=>{
    tab.push(ele)
    console.log(ele)
    document.getElementById('text').value=""
}
const captureImage=()=>{
    html2canvas(document.body).then(function(canvas){
        var a=document.createElement('a');
        a.href=canvas.toDataURL("../assets/image/jpeg").replace("image/jpeg","image/octet-stream");
        a.download="treedecision.jpg"
        a.click()
    })
}
    return (
      <>
  
    
    
      <div className="container " >
      <p className="row"></p>
      <br/>
      <br/>
      <Card style={{backgroundColor:"#46a7bb"}}>
     <h2 className="text-center text-success">Tree Décision</h2>
      <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Ajouter</Accordion.Header>
        <Accordion.Body>
        <CardBody>
            <form >
                <div className="col-sm-6">  <input type="text" className=" form-control" placeholder="ajouter element" id="text" onKeyPress={handleChange} /></div>
        
                <div className="col-sm-6">
<br/>        <Button  onClick={hanleAdd} color="primary"> Ajouter</Button> 
          </div>
</form>
        </CardBody>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Screen</Accordion.Header>
        <Accordion.Body>
        <CardBody>
     
          <Button onClick={captureImage}color="success"> Cpaturer</Button>

        </CardBody>
        </Accordion.Body>
      </Accordion.Item>
      </Accordion>
       
        
      </Card>
    <br/>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      {/* two boxes */}
      {
      tab.map((e,i) => {
        //console.log("box2_".concat(i.toString()))
     return(
        <Box 
        
        text={e}
        {...{ addArrow, setArrows, boxId: "box2_".concat(i.toString()) }}
      /> )       
      })

}

      {arrows.map(ar => (
        <Xarrow
          start={ar.start}
          end={ar.end}
          key={ar.start + "-." + ar.start}
        />
      ))}
    </div>

  
    </div>
  </>
    );
}
export default Main;