const express = require('express')
const app = express()
const fs = require('fs')
const cors = require('cors')

app.listen(3000, console.log("¡¡Servidor Encendido!!"))
app.use(cors())
app.use(express.json())

app.get("/canciones", (req, res) => {
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"));
    res.json(canciones);
  });

  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });