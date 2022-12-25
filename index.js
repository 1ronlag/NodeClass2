const express = require('express')
const app = express()
const fs = require('fs')
const cors = require('cors')
const fsPromises = require('fs').promises

app.listen(3000, console.log("¡¡Servidor Encendido!!"))
app.use(cors())
app.use(express.json())

app.get("/canciones", async (req, res) => {
    const canciones = JSON.parse(await fsPromises.readFile("canciones.json"));
    res.json(canciones);
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

//Agregar Canciones//
app.post("/canciones", async (req, res) => {
    try {
        if (req.body.titulo === "" || req.body.artista === "" || req.body.tono === "") {
            res.send("Favor completa todos los campos");
            console.log("Favor completa todos los campos")
        } else {
            const cancion = req.body
            const canciones = JSON.parse(await fsPromises.readFile("canciones.json"))
            canciones.push(cancion)
            await fsPromises.writeFile("canciones.json", JSON.stringify(canciones))
            res.send("¡¡Cancion agregada Exitosamente!!")
            console.log("Cancion agregada Exitosamente")
        }
    } catch (error) {
        console.log("Ha ocurrido un error");
    }

})

