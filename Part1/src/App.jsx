import { useState } from 'react'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

   const GoodFeed = () => {
    setGood(good + 1)
   }

   const BadFeed = () => {
    setBad(bad + 1)
   }

   const NeutralFeed = () => {
    setNeutral(neutral + 1)
   }

  return (
    <div>
      <Display />
      <Button onClick={GoodFeed} text='Good' />
      <Button onClick={NeutralFeed} text='Neutral' />
      <Button onClick={BadFeed} text='Good'/>

      <Statistics good={good} neutral={neutral} bad={bad} />
      
    </div>
  )
}
const Display = () => {
  return(
    <h1>Give Feedback</h1>
  )
}
const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}
const Statistics = ({good, neutral, bad}) => {  
  return(<>
  <h1>Statistics</h1>
  <p>Good: {good} <br /> Neutral: {neutral} <br /> Bad: {bad}</p>
  </>
)}

export default App