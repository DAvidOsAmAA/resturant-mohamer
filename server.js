//EVERYTHING FOR NODE
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'});
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const mongoose = require('mongoose')

// app.use(bodyParser)
app.use(express.json())

const {  createUser, getUser, updateUser, deleteUser, getAllUsers} = require("./user.js")
const {chatbot,createChat, readChat, updateChat, deleteChat} = require("./chatbotContoller.js")
mongoose.connect(process.env.CONN_STR)
.then( ()=> {console.log('Connection Established with MongoDB Atlas')})

app.post('/api/chats/createChat',createChat)
app.get('/api/chats/readChat',readChat)

app.post('/api/chats/chatbot',chatbot)

app.post('/api/users/createUser', createUser)
app.get('/api/users/getUser', getUser)
app.patch('/api/users/updateUser', updateUser)
app.delete('/api/users/deleteUser', deleteUser)


//Server Listening  
const Port = process.env.PORT || 3000;
const server = app.listen(Port,'localhost', () => {
    console.log(`-------------------\nServer running on Port: ${Port}`);
})
  
