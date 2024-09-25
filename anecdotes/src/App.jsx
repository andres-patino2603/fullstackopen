import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  console.log(anecdotes.length)
  const [selected, setSelected] = useState(1)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const handleClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  const AnecVote = () => {
    const vote = [...votes]
    console.log(selected, " votes selected")
    vote[selected] += 1
    console.log("Vote added", "Vote selected: ", selected, " Number vote: ", vote[selected])
    setVotes(vote)
  }

  const mostVotes = votes.indexOf(Math.max(...votes))
  console.log("Most votes: ", mostVotes)
  return (
    <div>
      <Display text="Random anecdote"/>
      <Anecdote text={anecdotes[selected]} vote={votes[selected]}/>
      <Button onClick={AnecVote} text="Vote"/>
      <Button onClick={handleClick} text="Randon anecdote"/><br />
      <MostVotes text={anecdotes[mostVotes]} vote={votes[mostVotes]}/>
    </div>
  )
}
const MostVotes =({text, vote}) => {
  return(
    <>
    <h1>Anecdote with most votes</h1>
    <p>{text}</p>
    <p>has {vote} votes</p>
    </>
  )
}
const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}
const Anecdote = ({text, vote}) => {
  return(
    <>
    <p>{text}</p>
    <p>has {vote} votes</p>
    </>
  )
}
const Display = ({text}) => {
  return(
    <h1>{text}</h1>
  )
}

export default App