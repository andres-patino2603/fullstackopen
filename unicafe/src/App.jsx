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
  const all = good+neutral+bad
  let average=0
  if(all != 0){
      average = ((good*1)+(neutral*0)+(bad*-1))/all 
  }
  if(all === 0){
    return(
      <>
      <h1>Statistics</h1>
      <p>No feedback given</p>
      </>
    )}
  return(<>
   <h1>Statistics</h1>
   <table>
    <tbody>
      <StatisticLine text="Good" value={good} />
      <StatisticLine text="Neutral" value={neutral} />
      <StatisticLine text="Bad" value={bad} />
      <StatisticLine text="All" value={all} />
      <StatisticLine text="Average" value={average} />
      <StatisticLine text="Positive" value={`${(good / all) * 100} %`} />
      </tbody>
   </table>
  </>
)}
const StatisticLine = ({ text, value }) => {
  return (
    <>
    <style>
      {`
      table, th, td {
        border: 1px solid black;
      }
      th, td {
        padding: 1px;
        text-align: left;
      `}
    </style>
    <tr>
    <td> {text}</td>
    <td> {value}</td>
  </tr>
  </>
  )
}
export default App