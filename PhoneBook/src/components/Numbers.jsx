import Person from './Persons'

const Numbers = ({ showPersons }) => {
    return (
      showPersons.map(person => (
        <Person key={person.name} person={person} />
      ))
    )
  }

export default Numbers;