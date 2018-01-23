const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const Chat = require('./api/chats/model')
const MessageController = require('./api/messages')

const app = express()
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost/dontwhats'
const port = process.env.PORT || 1234

mongoose.connect(mongoUri)

app.use(cors())
app.use(bodyParser.json())
app.use('/api/messages', MessageController)

app.get('/:chat', (req, res) => {
  Chat.findOne({ title: req.params['chat'] }, (err, chat) => {
    if (err) {
      res.send(err)    
    } else if (!Boolean(chat)) {
      Chat.create({ title: req.params['chat'] })
    }
  })
  
  res.sendFile(__dirname + '/views/chat.html')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})