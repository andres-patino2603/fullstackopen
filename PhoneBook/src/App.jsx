import { useState } from 'react'
import Person from './components/Persons'
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
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
const Numbers = ({ showPersons }) => {
  return (
    showPersons.map(person => (
      <Person key={person.name} person={person} />
    ))
  )
}
const PersonForm = ({ addPerson, newName, handlePersonChange, newNumber, handleNumberChange }) => {
  return(
    <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={handlePersonChange}/>
    </div>
    <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}
const Filter = ({ filterName, handleFilterPerson }) => {
  return (
    <div>
      filter shown with: <input type="text" value={filterName} onChange={handleFilterPerson} />
    </div>
  )
}
export default App