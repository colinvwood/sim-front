const express = require('express')
const app = express()
const port = 3333

app.get('/express', (req, res) => {
    res.send('Hello World within react')
})

app.get('/express/api', (req, res) => {
    res.json({message: "hello from express"});
});


app.listen(port)
