import { useState, useEffect } from "react";
import Note from "./components/Note";
import axios from 'axios'

const promise = axios.get('http://localhost:3001/notes')
promise.then(response => {
  // console.log(response)
})

const promise2 = axios.get('http://localhost:3001/foobar')
promise2.then(response => {
  //console.log(response)
})

axios
  .get('http://localhost:3001/notes')
  .then(response => {
    const notes = response.data //Se puede hacer destructuring de response.data
  }) //Mejor forma de hacerlo, no es necesario crear una variable promise

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("Type new note...");
  const [showAll, setShowAll] = useState(true);
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

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }
  
  useEffect(hook, [])
          console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };
    const NewNote = notes.concat(noteObject);
    setNotes(NewNote);
    setNewNote("");
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value, "note changed handler function");
    setNewNote(event.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />

        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
