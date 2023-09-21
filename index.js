const express = require("express")
const socket = require("socket.io")
const dotenv = require("dotenv")

dotenv.config()

const PORT = process.env.PORT

const app = express()

const server = app.listen(PORT, () =>{
    try {
        console.log(`Server is running on port: ${PORT}`)
    } catch (error) {
        
    }
})

const io = socket(server, {
    cors:{
        origin: '*'
    }
})

io.on("connection", (socketClient) =>{
    console.log("User connected", socketClient.id)

    socketClient.on("message", msg =>{
        // console.log(msg)
        socketClient.broadcast.emit("message", msg)
    })

})

app.get("/", (req, res) =>{
    res.json({msg: "Welcome to the home page"})
})