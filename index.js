const express = require('express')
const app = express()
const fs = require('fs')
const cors = require('cors')
const fsPromises = require('fs').promises

app.listen(3000, console.log("¡¡Servidor Encendido!!"))
app.use(cors())
app.use(express.json())

app.get("/canciones", async (req, res) => {
    const canciones = JSON.parse(await fsPromises.readFile("repertorio.json"));
    res.json(canciones);
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

//Agregar Canciones//
app.post("/canciones", async (req, res) => {
    try {
        if (req.body.cancion === "" || req.body.artista === "" || req.body.tono === "") {
            res.send("Favor completa todos los campos");
            console.log("Favor completa todos los campos")
        } else {
            const cancion = req.body
            const canciones = JSON.parse(await fsPromises.readFile("repertorio.json"))
            canciones.push(cancion)
            await fsPromises.writeFile("repertorio.json", JSON.stringify(canciones))
            res.send("¡¡Cancion agregada Exitosamente!!")
            console.log("Cancion agregada Exitosamente!")
        }
    } catch (error) {
        console.log("No se puede agregar la cancion solicitada");
    }

})

//Borrar Canciones//
app.delete("/canciones/:id", async (req, res) => {
    try {
        const { id } = req.params
        const canciones = JSON.parse(await fsPromises.readFile("repertorio.json"))
        const index = canciones.findIndex(p => p.id == id)
        if (index === -1) {
            res.send("imposible eliminar cancion de la lista");
        }
        canciones.splice(index, 1)
        await fsPromises.writeFile("repertorio.json", JSON.stringify(canciones))
        res.send("Canción eliminada Exitosamente")
        console.log("Canción Eliminada Exitosamente!")
    } catch (error) {
        res.json({ message: "No se puede eliminar la cancion solicitada " });
    }
})

//Modificar Cancion//
app.put("/canciones/:id", async (req, res) => {
    try {
        const { id } = req.params
        const cancion = req.body

        if (Object.values(cancion).some((value) => value === "")) {
            res.send("imposible modificar la cancion de la lista");
        }
        const canciones = JSON.parse(await fsPromises.readFile("repertorio.json"))
        const index = canciones.findIndex(p => p.id == id)
        canciones[index] = cancion
        await fsPromises.writeFile("repertorio.json", JSON.stringify(canciones))
        res.send("Canción modificada con Éxito")
        console.log("Canción modificada con Éxito")
    } catch (error) {
        res.json({ message: "No se puede eliminar la cancion solicitada " });
    }

})