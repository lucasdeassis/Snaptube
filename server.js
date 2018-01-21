const express = require('express')
const path = require('path')
const port = process.env.PORT || 8080
const app = express()

var BUILD_DIR = path.resolve(__dirname, 'dist')

app.use(express.static(BUILD_DIR))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(BUILD_DIR, 'index.html'))
})

app.listen(port)
console.log(`server running on port ${port}`)
