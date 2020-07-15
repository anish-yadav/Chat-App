const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const socket = require('socket.io')
const app = express()
const httpServer = require('http').createServer(app)
const io = socket(httpServer)

const mongoose = require('mongoose')
const { ApolloServer } = require('apollo-server-express')

const {typeDefs,resolvers} = require('./schema/schema')
const { on } = require('process')
const server = new ApolloServer({
    typeDefs,
    resolvers
})
server.applyMiddleware({app})

mongoose.connect('mongodb+srv://hneyanish:Anish1000@cluster0-meykw.mongodb.net/ChatApp?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection.on('open' ,() => {
    console.log(`Connected to mongodb`)
})


app.use(cors())
app.use(bodyParser.json())

app.get('/',(req,res)=> {
    console.log('getting a request')
    res.send('Server running fine')
})


const online = [{}]

io.on('connection',socket => {

    socket.on('online',({username}) => {
        let index = online.findIndex(user => user.username == username)
        if(index < 0)
            online.push({username,socID:socket.id})
        else
            online[index] = {username,socID:socket.id}
        socket.broadcast.emit('online users' , {online})
        io.emit('online users' , {online})
    })
    
    // socket.on('send message',({text,from}) => {
    //     console.log('sending message',text)
    //     socket.broadcast.emit('recieve message',{text,from})
    // })
    socket.on('send message',({text,from,to,name}) => {
        var user = online.find(user => user.username == to)
        console.log(text,from,to)
        console.log(online)
        if(user && user.socID)
            socket.to(user.socID).emit('message',{text,from,name,timestamp:new Date().getTime()})
        else
            console.log('user not online ')
    })
    socket.on('disconnect', () => {
        let index = online.findIndex(user => user.socID == socket.id)
        if(index > -1)
            online.splice(index,1)
        socket.emit('online users',{online})
    })
})



httpServer.listen(4000,() => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
})