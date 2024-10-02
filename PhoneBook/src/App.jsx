import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Persons'
import Numbers from './components/Numbers'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notificacion'
import personsService from './services/persons'
const App = () => {

  useEffect(() => {
    personsService.getAll().then(initialPersons=>{
      setPersons(initialPersons)})
    }, []) 


  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('add new name')
  const [newNumber, setNewNumber] = useState('add new number')
  const [filterName, setFilterName] = useState('')
  const [notification, setNotification] = useState({message: null, style: {}})
  const errorStyle = {
    fontStyle: 'italic',
    color: 'red',
    background: 'lightgrey',
    fontSize: 16,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
}

const okStyle = {
    fontStyle: 'italic',
    color: 'green',
    background: 'lightgrey',
    fontSize: 16,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
}
  
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    const NewPerson = persons.concat(personObject);
    if (persons.some(person => person.name === newName) && newName !== "") {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const person = persons.find(n => n.name === newName)
        const changedPerson = { ...person, number: newNumber }
        personsService.update(person.id, changedPerson).then(returnedPerson => {
          setPersons(persons.map(modifyPerson => modifyPerson.id !== person.id ? modifyPerson : returnedPerson))
          setNotification({message: `Changed number for ${newName}`, style: okStyle})
          setTimeout(() => {
            setNotification({message: null, style: {}})
          }, 5000)
        }).catch(error => {
          setNotification(
            { message: `Information of ${newName} has already been removed from server`, style: errorStyle }
          )
          console.log("Error", error)
          setTimeout(() => {
            setNotification({message: null, style: {}})
          }, 5000)
        })
      }
    } else if (newName === "" || newNumber === "") {
      alert(`Please enter a name or number`);
    } else{
      personsService.create(personObject).then(returnedPerson=>{
        setPersons(persons.concat(returnedPerson))
        setNotification({message: `Added ${newName}`, style: okStyle}).setTimeout(() => {
          setNotification({message: null, style: {}})}, 5000)
        }).catch(error => {
          setNotification(
            { message: error.response.data.error, style: errorStyle }
          )
          console.log("Error", error)
          setTimeout(() => {
            setNotification({message: null, style: {}})
          }, 5000)
        })
    setNewName("");
    setNewNumber("");
    }
  }
  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }
  const handleFilterPerson = (event) => {
    setFilterName(event.target.value);
  }
  const showPersons = filterName === "" 
  ? persons 
  : persons.filter(person => 
      person.name.toLowerCase().includes(filterName.toLowerCase())
    );

const deletePerson = id => {
  const person = persons.find(n => n.id === id)
  if (window.confirm(`Delete ${person.name}`)) {
    personsService.deletePerson(id).then(() => {
      setPersons(persons.filter(person => person.id !== id))
      setNotification({message: `Deleted ${person.name}`, style: okStyle})
    }).catch(error => {
      setNotification(
        { message: `Information of ${person.name} has already been removed from server`, style: errorStyle }
      )
      console.log("Error", error)
      setTimeout(() => {
        setNotification({message: null, style: {}})
      }, 5000)
    })
    }}


  return (
    <div>
      <Notification message={notification.message} style={notification.style} />
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterPerson={handleFilterPerson} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Numbers showPersons={showPersons} deletePerson={deletePerson} />
    </div>
  )
}



export default App