const connectToMongo = require('./db');
connectToMongo();
const express = require('express')

const app = express()
const port = 5000

//middleware
app.use(express.json()) 

//Available routes 
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.get('/api/v1/login', (req, res) => {
//   res.send('Hello Login!')
// })

// app.get('/api/v1/signup', (req, res) => {
//   res.send('Hello Signup!')
// })

app.listen(port, () => {
  console.log(`iNoteBook app listening on port http://localhost:${port}`)
})