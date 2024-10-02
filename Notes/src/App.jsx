import { useState, useEffect } from "react";
import Note from "./components/Note";
import Notification from "./components/Notifcation";
import axios from 'axios'
import noteService from './services/notes'
import Footer from './components/Footer'
// axios
//   .get('http://localhost:3001/notes')
//   .then(response => {
//     const notes = response.data //Se puede hacer destructuring de response.data
//   }) //Mejor forma de hacerlo, no es necesario crear una variable promise

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("Type new note...");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('some error happened...')
  // useEffect(() => 
  //   { console.log('effect')    
  //     axios.get('http://localhost:3001/notes')
  //     .then(
  //       response => 
  //         { 
  //           console.log('promise fulfilled')        
  //           setNotes(response.data) 
  //         }) 
  //       }, [])  

  useEffect(() => {
    noteService.getAll().then(initialNotes=>{
      setNotes(initialNotes)})
    }, [])
  // console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };
    noteService.create(noteObject).then(returnedNote=>{
      setNotes(notes.concat(returnedNote))
      setNewNote('')})
  };

  const handleNoteChange = (event) => {
    // console.log(event.target.value, "note changed handler function");
    setNewNote(event.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

    const toggleImportanceOf = id => {
      const note = notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }
    
      noteService
        .update(id, changedNote)
          .then(returnedNote => {
          setNotes(notes.map(note => note.id !== id ? note : returnedNote))
        })
        .catch(error => {
          setErrorMessage(
            `Note '${note.content}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => (
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />

        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
