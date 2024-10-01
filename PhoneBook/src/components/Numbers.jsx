import Person from './Persons'

const Numbers = ({ showPersons, deletePerson }) => {
    return (
      showPersons.map(person => (
        <Person key={person.name} person={person} deletePerson={deletePerson} />
      ))
    )
  }

export default Numbers;