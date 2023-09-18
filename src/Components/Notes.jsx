import React, { useState, useEffect } from 'react';
import Noteitem from './Noteitem';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const initialIndex = 1; // Initial index for local storage
  const notesPerPage = 20; // Number of notes to display per page

  useEffect(() => {
    // Fetch data from the JSONPlaceholder API
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setNotes(data));
  }, []);

  const handleAddNote = () => {
    if (title.trim() !== '' && description.trim() !== '') {
      // Create a new note object
      const newNoteObj = {
        id: notes.length + initialIndex,
        title: title,
        body: description, // Use 'body' as the description property
      };

      // Update the state to include the new note
      setNotes([...notes, newNoteObj]);

      // Save the new note to local storage
      localStorage.setItem(`note_${notes.length + initialIndex}`, JSON.stringify(newNoteObj));

      // Clear input fields
      setTitle('');
      setDescription('');
    }
  };

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * notesPerPage;
  const endIndex = startIndex + notesPerPage;

  // Get the notes to display for the current page
  const notesToDisplay = notes.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(notes.length / notesPerPage);

  // Generate an array of page numbers
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div>
      <h1>NoteKeeper</h1>
      <div className="add-note">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
        />
        <button onClick={handleAddNote}>Add</button>
      </div>
      <div className="notes-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {notesToDisplay.map((note, index) => (
              <Noteitem
                key={note.id}
                id={note.id}
                title={note.title}
                desc={note.body} 
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Notes;
