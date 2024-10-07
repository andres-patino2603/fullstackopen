
const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =`mongodb+srv://andrespatino0845:${password}@cluster0.uy8az.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'Otra cosa indexada',
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})

//Si agregamos cosas dentro  del {} nos va a filtrar y traer resultados segun ese criterio, es comp un where en sql
//ejemplo de filtrado {_id: '66ff5aebc2a4c89fd8a1af09'} nos traeria solo el registro con ese id, si esta vacio trae todos los registros
// Note.find({}).then(result => {
//     result.forEach(note => {
//       console.log(note)
//     })
//     mongoose.connection.close()
//   })