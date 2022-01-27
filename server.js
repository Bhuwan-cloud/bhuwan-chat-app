const express = require('express')

const app = express()

const http = require('http').createServer(app)


const PORT = process.env.PORT || 3000


http.listen(PORT, () => {

    console.log('listening on Port:  ' + PORT)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// socket --------

const io = require('socket.io')(http)

io.on('connection', (socket)=>{

    console.log("Web Socket is Connected.... ")

    // listening to xevent which is emmited by client js 
    socket.on('xevent', (msg) => {
       
        socket.broadcast.emit("yevent", msg);

    })

} )