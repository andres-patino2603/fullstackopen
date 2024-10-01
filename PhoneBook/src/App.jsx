import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Persons'
import Numbers from './components/Numbers'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
const App = () => {

  useEffect(() => 
    { console.log('effect')    
      axios.get('http://localhost:3001/persons')
      .then(
        response => 
          { 
            console.log('promise fulfilled')        
            setPersons(response.data) 
          }) 
        }, [])  


  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('add new name')
  const [newNumber, setNewNumber] = useState('add new number')
  const [filterName, setFilterName] = useState('')
  
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const NewPerson = persons.concat(personObject);
    if (persons.some(person => person.name === newName) && newName !== "" && persons.some(person => person.number === newNumber)) {
      alert(`${newName} is already added to the phonebook`);
    } else if (newName === "" || newNumber === "") {
      alert(`Please enter a name or number`);
    } else{
      setPersons(NewPerson);
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


console.log(showPersons, "Filtered persons");
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterPerson={handleFilterPerson} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Numbers showPersons={showPersons} />
    </div>
  )
}



export default App