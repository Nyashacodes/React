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

//***************Route2:Post request to add a new note  POST"/api/notes/addnote". Login required***********

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

//***************Route3: Update an existing note with id.using:POST"/api/notes/updatenote" {we can use post but for update we use PUT request} Login required***********
// router.post('/updatenote/:id', fetchuser, async (req,res)=>{
//       const {title, description, tag} = req.body;
//       //create a newNote object
//       const newNote={};
//       if(title){newNote.title = title};
//       if(description){newNote.description = description};
//       if(tag){newNote.tag = tag};
      
//       //Find the note to be updated and update it
//       // const note = Note.findByIdAndUpdate()
//       let note = await Note.findById(req.params.id);//is the id that we want to update
//       if(!note){return res.status(404).send("Not Found")}

//       if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed");}
//       note = await Note.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true})//new:true means if it is a new contact, it will be added
      
//       res.join({note});

// })
router.put('/updatenote/:id', fetchuser, 
//       [
//       body("title", "Enter a valid Title").isLength({ min: 3 }),
//       body("description", "Description should be at least 5 characters long").isLength({ min: 5 })
//   ], 
  async (req, res) => {
      const { title, description, tag } = req.body;
  
      // Create a newNote object
      const newNote = {};
      if (title) newNote.title = title;
      if (description) newNote.description = description;
      if (tag) newNote.tag = tag;
  
      try {
          // Find the note to be updated and update it
          let note = await Note.findById(req.params.id);
          if (!note) {
              return res.status(404).send("Not Found");
          }
  
          // Allow updation only if user owns this note
          if (note.user.toString() !== req.user.id) {
              return res.status(401).send("Not Allowed");
          }
  
          note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
          res.json(note);
      } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
      }
  });
  
// Route 4: Delete an existing note using: DELETE "/api/notes/deletenote/:id". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
      try {
          // Find the note to be deleted and delete it
          let note = await Note.findById(req.params.id);
          if (!note) {
              return res.status(404).send("Not Found");
          }
  
          // Allow deletion only if user owns this note
          if (note.user.toString() !== req.user.id) {
              return res.status(401).send("Not Allowed");
          }
  
          note = await Note.findByIdAndDelete(req.params.id);
          res.json({ "Success": "Note has been deleted", note: note });
      } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
      }
  });

  
module.exports = router

