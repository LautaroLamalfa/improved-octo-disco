const express = require ("express");
const chatRoute = require("./routes/chat");
const prodRoute = require ("./routes/productos");

const app = express()

app.use(express.static(__dirname + "/public"))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/api/chat", chatRoute);
app.use("/api/products", prodRoute)

const http = require("http");
const server = http.createServer(app)

const { Server } = require ("socket.io");
const io = new Server(server)

io.on("connection", (socket)=> {
    socket.emit("render", "")
    socket.on("actualizacion", ()=>{
      io.sockets.emit("render", "")
    })
  })

server.listen(8080, () => {
    console.log("Servidor 👍 por 8080")
})