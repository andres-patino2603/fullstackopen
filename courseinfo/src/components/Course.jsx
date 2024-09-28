const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises} 
  </p>

const Content = ({ parts }) =>{ 
    const partsArray = parts.map((part) => 
    <Part key={part.id} part={part} />)

    console.log(partsArray, "Compo")
return(
  <>
    {partsArray}  
  </>
)}

const Course = ({ course }) => {
    const { name, parts } = course
    const sum = parts.reduce((sumar, part) => sumar + part.exercises, 0)
    return (
      <div>
        <Header course={name} />
        <Content parts={parts} />
        <Total sum={sum} />
      </div>
    )
}
  export default Course