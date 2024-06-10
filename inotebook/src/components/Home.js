import React, { useContext } from 'react'
import Notes from './Notes';

const Home = () => {

  
  return (
  <>  
    <div className="container mt-5">
      <h2>Add a New Note</h2>
      <form
      //  onSubmit={handleSubmit}
       >
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            // value={note.title}
            // onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            // value={note.description}
            // onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            // value={note.tag}
            // onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Note</button>
      </form>
    </div>
    <Notes/> 
  </>  
  )
}

export default Home
