const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./routes')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(routes)
app.use('/', (req, res) => {
    res.send('Start requesting at https://prueba-crud-users.herokuapp.com/user ')
})

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log('[index] CRUD running at port ' + port)
})