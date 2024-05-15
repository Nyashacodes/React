import React, {useState} from 'react'




export default function TextForm(props) {
const [text, setText] = useState("");

const  handleUpClick=()=> {
    // console.log("Button is clicked!"+ text)
    let newText = text.toUpperCase();
    setText(newText)
    props.showAlert("Converted to upper Case", "success")
}

const  handleLowClick=()=> {
    // console.log("Button is clicked!"+ text)
    let newText = text.toLowerCase();
    setText(newText)
}
const  handleClearClick=()=> {
    // console.log("Button is clicked!"+ text)
    let newText = "";
    setText(newText)
}
const handleRemoveExtraSpace=()=>{
    let removedspacesfromtext = text.split(/[ ]+/);
    setText(removedspacesfromtext.join(" "));
}
const  handleOnChanged=(event)=> {
     setText(event.target.value)
    //  console.log("I'M handle",text)
}

const handleCopy=()=>{
    let copytext = document.getElementById('myBox');
    copytext.select();
    navigator.clipboard.writeText(copytext.value);
}



  return (
    <>
    <div className='container'style={{ color: props.mode === 'dark'?'white':'black'}}>
        <h1>{props.heading} </h1>
        <div className ="mb-3">
            <textarea 
            className ="form-control"
            value = {text} 
            onChange={handleOnChanged} 
            style={{
               backgroundColor:props.mode === 'dark'?'grey':'white',
               color : props.mode === 'dark'?'white':'black'
            }}
            id="myBox" 
            rows="8"></textarea>
        </div>
        <button className="btn btn-primary mx-1" onClick={handleUpClick}>Convert to UpperCase</button>
        <button className="btn btn-primary mx-1" onClick={handleLowClick}>Convert to LowerCase</button>
        <button className="btn btn-primary mx-1" onClick={handleClearClick}>Clear Text</button>
        <button className="btn btn-primary mx-1" onClick={handleCopy}>Copy Text</button>
        <button className="btn btn-primary mx-1" onClick={handleRemoveExtraSpace}>Remove Extra Space</button>
    </div>
    <div className="container my-5" style={{ color: props.mode === 'dark'?'white':'black'}}>
        <h1>Your Text Summary</h1>
        <p>You have entered {text.split(" ").length} words and {text.length} characters.</p>
        <p>{0.008 * (text.split(" ").length)} Minutes to read</p>
        <p>{(0.008 * text.split(" ").length)*60} Seconds to read</p>
        <h2>Preview</h2>
        <p>{text.length>0?text:"Enter Something in the above box to preview it here"}</p>
    </div>
    </>
  )
}
