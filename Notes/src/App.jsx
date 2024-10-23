import { useState, useEffect } from "react";
import Note from "./components/Note";
import Notification from "./components/Notifcation";
import axios from "axios";
import noteService from "./services/notes";
import Footer from "./components/Footer";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import NoteForm from "./components/NoteForm";
import Togglable from "./components/Togglable";

// axios
//   .get('http://localhost:3001/notes')
//   .then(response => {
//     const notes = response.data //Se puede hacer destructuring de response.data
//   }) //Mejor forma de hacerlo, no es necesario crear una variable promise

const App = () => {
  const [notes, setNotes] = useState([]);
  // const [newNote, setNewNote] = useState("Type new note...");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

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
  //useEffect para cargar los datos de la API(notas)
  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  //useEffect para cargar los datos del usuario que se loguea en la aplicación y guardarlos en el local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      //Lo que hace es guardar los datos del inicio de sesión en el local storage del navegador para que no se pierdan al recargar la página o cerrar el navegador
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const addNote = (noteObject) => {
    noteService
      .create(noteObject)
        .then((returnedNote) => {
          setNotes(notes.concat(returnedNote));
          setErrorMessage("Note added successfully");
          setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    });
  };

  // const handleNoteChange = (event) => {
  //   // console.log(event.target.value, "note changed handler function");
  //   setNewNote(event.target.value);
  // };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const [loginVisible, setLoginVisible] = useState(false);
  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <Togglable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    );
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user && <div>
       <p>{user.name} logged in</p>
       <Togglable buttonLabel="new note">
        <NoteForm createNote={addNote}
        />
      </Togglable>
      </div>
     }

      {/* {user === null ?
      loginForm() :
      noteForm()
    } */}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <div className="noteDisplay">
        <ul>
          {Array.isArray(notesToShow) ? (
            notesToShow.map((note) => (
              <Note
                key={note.id}
                note={note}
                toggleImportance={() => toggleImportanceOf(note.id)}
              />
            ))
          ) : (
            <li>No notes available</li>
          )}
        </ul>
      </div>

      <Footer />
    </div>
  );
};

export default App;
