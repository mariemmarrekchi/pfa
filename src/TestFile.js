import React,{ useState,useRef } from "react";
import Xarrow from 'react-xarrows';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import textfile from "./assets/diff_data_098.txt";
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import Block from './Block'
import Accordion from 'react-bootstrap/Accordion';

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

function TestFile() {
  const [arrows, setArrows] = useState([]);
  const addArrow = ({ start, end }) => {
    setArrows([...arrows, { start, end }]);
  };
  const [file, setFile] = useState();
const [content, setContent] = useState([]);
  const [Pls,setTabPls]=useState([]);
let fileContent="";

const writing=()=>{

}
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
  var som=-1;
  //chaine tableau data 
  var datachaine="";
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
  
  //console.log("f"+fileContent)
  console.log("s"+som);
  const [rangeA,setRangeA]=useState(0.5);
  const [rangeB,setRangeB]=useState(1.5);
  const [rangeAmax,setRangeAmax]=useState(1.5);
  const [rangeBmax,setRangeBmax]=useState(2.5);
  const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true); 
const cahngeRangeA=(e)=>{setRangeA(e.target.value); if(e.target.value==""){setRangeA(0);console.log("yes i'm vide A")} console.log(e.target.value)}
const cahngeRangeB=(e)=>{setRangeB(e.target.value);if(e.target.value==""){setRangeB(0);console.log("yes i'm vide B")}}

//write code en c#
datachaine="namespace spectrum;\n";
datachaine+="{class treedecision {\n private static readonly double[] PLS = new double[]{"+Pls+"};\n";
datachaine+=" private static readonly double[] data = new double[]{"+content+"};\n";
datachaine+="private static readonly int length =48;\n static void Main(string[] args) { \n int a1,a2,b1,b2=;"+-1+";\n"
datachaine+= "a1="+parseFloat(rangeA)+";\n";
datachaine+= "b1="+parseFloat(rangeAmax)+";\n";
datachaine+= "a2="+parseFloat(rangeB)+";\n";
datachaine+= "b2="+parseFloat(rangeBmax)+";\n";
//datachaine+=" //get result score \n double score =0;for(int spec=0;spec<length;spec++) score+="+Pls+"[spec]*"+content+"[spec];\n";  
datachaine+="score="+som+";\n";
datachaine+=" if(a1<=score && score <=b1){\n System.Console.WriteLine('PE');}\n else if(a2<=score && score <=b2) {System.Console.WriteLine('PP');}";
datachaine+="else {System.Console.WriteLine('Unkown');}System.Console.WriteLine(score);}\n }\n}";
console.log(datachaine);

const downloadText=()=>{
  function download(file, text) {
         console.log("yes dowload")   
    //creating an invisible element
    var element = document.createElement('a');
    element.setAttribute('href', 
    'data:text/plain;charset=utf-8, '
    + encodeURIComponent(text));
    element.setAttribute('download', file);
  
    // Above code is equivalent to
    // <a href="path of file" download="file name">
  
    document.body.appendChild(element);
  
    //onClick property
    element.click();
  
    document.body.removeChild(element);
}
  document.getElementById("btn")
          .addEventListener("click", function() {
              // Generate download of hello.txt 
              // file with some content
              var filename = "codeC#.txt";
            
              download(filename, datachaine);
          }, false);
}
const [blocks, setBlocks] = useState([]);
const [idx,setId]=useState("")

const addBlock = () => {
  setBlocks([
    ...blocks,
    {
      id: blocks.length + 1,
      title: `Block ${blocks.length + 1}` ,
      background: "lightgreen",
      color: "white",
      link: null,
    },
  ]);
};
const [selectedBlockId, setSelectedBlockId] = useState(null);

const handleDeleteClick = () => {
  const updatedBlocks = [...blocks];
  const index = updatedBlocks.findIndex((block) => block.id !== selectedBlockId);
  console.log(index)
  updatedBlocks.splice(index, 1);
  setBlocks(updatedBlocks);
  setSelectedBlockId(null);
};
const [inputList, setInputList] = useState([{ value: "" }]);

function handleAddInput() {
  setInputList([...inputList, { value: "" }]);
}



return(
  <div className="container">
      <div className="row">

    <h2 className="text-center text-primary mt-4 mb-4"><Badge pill bg="primary" className="text-white">
                    Tree de décison
    </Badge>{' '}</h2>
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header><b>Add Blocks  #1 </b> </Accordion.Header>
        <Accordion.Body>
        Add  Block
          
          <Button variant="primary" id="btn" onClick={addBlock}>
          Add Block
        </Button>
         
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header className="text-center"><b >update interval  #2</b></Accordion.Header>
        <Accordion.Body>
        Modify the interval of each label
        <Button variant="primary" onClick={handleShow}>
      change range
    </Button>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header> <b>generate c# code #3</b></Accordion.Header>
        <Accordion.Body>
          download code c#
          <Button variant="primary" id="btn2" onClick={downloadText}>
      download file
    </Button>
        </Accordion.Body>
      </Accordion.Item>

    </Accordion>
    <hr style={{visibility:'hidden'}}></hr>
         
          <div className="card">
               <div className=" row">
                  
                  <div>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change Range</Modal.Title>
      </Modal.Header>
       {/* onClick={handleAddInput} */}
      <Modal.Body>
      <div className="row" >

        <div className="6">
       label :  <span className="col-sm-3">Min: <input type ="number" className="col-sm-3" value={rangeA} onChange={cahngeRangeA}/></span> <span className="col-sm-3">Max: <input type ="number"  className="col-sm-3"value={rangeAmax} onChange={(e)=>{setRangeAmax(e.target.value)}}/></span>
        </div>

        
          </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
                    </div>
               </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
            {blocks.map((block) => (
        <div>
  <Block key={block.id} id={block.id} style={{
           
       
           background: block.background,
           color: block.color,
         }}
         text={block.title}
         {...{ addArrow, setArrows,handler: "right", boxId:"1".concat(block.id.toString())}} onDelete={() => handleDeleteClick()}  />
           </div>)
            )}
          
          </div>
          {arrows.map(ar => (
      <Xarrow
        start={ar.start}
        end={ar.end}
        key={ar.start + "-." + ar.start}
      />
    ))} 
      </div>
  </div>   
  
)

}
export default TestFile