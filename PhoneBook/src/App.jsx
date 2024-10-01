import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Persons'
import Numbers from './components/Numbers'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
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
  
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    const NewPerson = persons.concat(personObject);
    if (persons.some(person => person.name === newName) && newName !== "" || persons.some(person => person.number === newNumber)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const person = persons.find(n => n.name === newName)
        const changedPerson = { ...person, number: newNumber }
        personsService.update(person.id, changedPerson).then(returnedPerson => {
          setPersons(persons.map(modifyPerson => modifyPerson.id !== person.id ? modifyPerson : returnedPerson))
        })
      }
    } else if (newName === "" || newNumber === "") {
      alert(`Please enter a name or number`);
    } else{
      personsService.create(personObject).then(returnedPerson=>{
        setPersons(persons.concat(returnedPerson))})
      
    setNewName("");
    setNewNumber("");
    console.log("New person added");
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
  console.log("Delete person", person); 
  if (window.confirm(`Delete ${person.name}`)) {
    personsService.deletePerson(id).then(response => {
      setPersons(persons.filter(person => person.id !== id))
    })}
    }
console.log(showPersons, "Filtered persons");
  return (
    <div>
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