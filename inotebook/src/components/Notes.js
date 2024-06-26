import React, {useContext}from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';


const Notes = () => {
  const context = useContext(noteContext);
  const {notes, setNotes} = context;
  return (
    <div>
        <div className="row mt-5">
        <h2>Your Notes</h2>
        {notes.map((note)=>{
            return <Noteitem note={note}/>
        })}
        </div> 
    </div>
  )
}

export default Notes
