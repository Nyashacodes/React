const express = require('express');
const router = express.Router()
const fetchuser = require("../middleware/fetchuser")
const Note = require('../models/Note')
const { body, validationResult } = require("express-validator");



//***************Route 1: Get all the notes using: GET "/api/notes/fetchallnotes". Login required. Login required***********

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//***************Route2:Post request to add a new note  POST"/api/auth/addnote". Login required***********

router.post('/addnote', fetchuser,[
      body("title").isLength({ min: 3 }).withMessage("Enter a valid Title"),
      body("description").isLength({min:5}).withMessage("Description should be at least 5 characters long"),], async (req,res)=>
            {
            try {                     
                  const {title, description, tag} = req.body;
             //if there are errors, return the errors with Bad request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()});
            }
            const note = new Note({
                  title, description, tag, user:req.user.id
            })      
            const savedNote = await note.save()
      res.json(savedNote) 
            } catch (error) {
                  console.error(error.message);
                  res.status(500).send("Internal Server Error");
            }   
                  
})

//***************Route3: Update an existing note with id.using:POST"/api/auth/updatenote" {we can use post but for update we use PUT request} Login required***********
router.post('/updatenote/:id', fetchuser, async (req,res)=>{
      const {title, description, tag} = req.body;
      //create a newNote object
      const newNote={};
      if(title){newNote.title = title};
      if(description){newNote.description = description};
      if(tag){newNote.tag = tag};
      
      //Find the note to be updated and update it
      // const note = Note.findByIdAndUpdate()
      const note = Note.findById(req.params.id);//is the id that we want to update
      if(!note){return res.status(404).send("Not Found")}

      if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed");}
      note = await Note.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true})//new:true means if it is a new contact, it will be added
            

})

module.exports = router

