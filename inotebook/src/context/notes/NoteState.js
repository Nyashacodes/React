import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
    const notesInitial=[
        {
          "_id": "666438964f6bbdf80d5c7b48",
          "user": "6660701dce8d3510c87e28d8",
          "title": "leetcode",
          "description": "one question daily",
          "tag": "growth",
          "date": "2024-06-08T10:55:18.178Z",
          "__v": 0
        },
        {
          "_id": "666438964f6bbdf80d5c7b4a",
          "user": "6660701dce8d3510c87e28d8",
          "title": "leetcode",
          "description": "one question daily",
          "tag": "growth",
          "date": "2024-06-08T10:55:18.405Z",
          "__v": 0
        },
        {
            "_id": "666438964f6bbdf80d5c7b48",
            "user": "6660701dce8d3510c87e28d8",
            "title": "leetcode",
            "description": "one question daily",
            "tag": "growth",
            "date": "2024-06-08T10:55:18.178Z",
            "__v": 0
          },
          {
            "_id": "666438964f6bbdf80d5c7b4a",
            "user": "6660701dce8d3510c87e28d8",
            "title": "leetcode",
            "description": "one question daily",
            "tag": "growth",
            "date": "2024-06-08T10:55:18.405Z",
            "__v": 0
          },
          {
            "_id": "666438964f6bbdf80d5c7b48",
            "user": "6660701dce8d3510c87e28d8",
            "title": "leetcode",
            "description": "one question daily",
            "tag": "growth",
            "date": "2024-06-08T10:55:18.178Z",
            "__v": 0
          },
          {
            "_id": "666438964f6bbdf80d5c7b4a",
            "user": "6660701dce8d3510c87e28d8",
            "title": "leetcode",
            "description": "one question daily",
            "tag": "growth",
            "date": "2024-06-08T10:55:18.405Z",
            "__v": 0
          },{
            "_id": "666438964f6bbdf80d5c7b48",
            "user": "6660701dce8d3510c87e28d8",
            "title": "leetcode",
            "description": "one question daily",
            "tag": "growth",
            "date": "2024-06-08T10:55:18.178Z",
            "__v": 0
          },
          {
            "_id": "666438964f6bbdf80d5c7b4a",
            "user": "6660701dce8d3510c87e28d8",
            "title": "leetcode",
            "description": "one question daily",
            "tag": "growth",
            "date": "2024-06-08T10:55:18.405Z",
            "__v": 0
          }
      ]
      
 
    const [notes, setNotes] = useState(notesInitial)
    
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;