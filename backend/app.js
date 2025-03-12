require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const database = require('./dbconnector.js')
app.use(express.json());
let cors = require("cors")
app.use(cors())

app.get("/observasjoner", async (req, res) => {
    let query = "SELECT * FROM observasjoner;"
    try {
        let observasjoner = await database.query(query)
        res.send(observasjoner)
    } catch (error) {
        console.log(error)
    }
});

app.post("/addobservasjon", async (req, res) => {
    let nyObservasjon = req.body;
    console.log("Ny observasjon fra brukeren:", nyObservasjon.brukernavn)
    try {
        let query = `INSERT INTO observasjoner (brukernavn, art, dato, sted, kommentar) VALUES ('${nyObservasjon.brukernavn}', '${nyObservasjon.art}', '${nyObservasjon.dato}', '${nyObservasjon.sted}', '${nyObservasjon.kommentar}')`
        const dbResponse = await database.query(query)
        console.log("ny observajson lagt til i databasen")
        let observasjonSendt = true
        res.json(observasjonSendt)
    } catch (error) {
    console.log(error)
    }
})


app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});