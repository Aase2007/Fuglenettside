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
        let query = `INSERT INTO observasjoner (username, species, date, place, description) VALUES ('${nyObservasjon.brukernavn}', '${nyObservasjon.art}', '${nyObservasjon.dato}', '${nyObservasjon.sted}', '${nyObservasjon.kommentar}')`
        const dbResponse = await database.query(query)
        console.log("ny observajson lagt til i databasen")
        let observasjonSendt = true
        res.json(observasjonSendt)
    } catch (error) {
    console.log(error)
    }
})

app.post("/login", async (req, res) => {
    let query = "SELECT * FROM users;";
    try {
        console.log(req.body)
        let users = await database.query(query)
        const epost = req.body.epost
        const passord = req.body.password
        let loggetInn = false
        for (let i=0; i<users.length; i++) {
            if (users[i].epost == epost && users[i].password == passord) {
                console.log('logget inn')
                loggetInn = true
            }
        }
        if (!loggetInn) {
            console.log('epost eller passord er feil')
        }
        res.json(loggetInn)
      
    } catch (error) {
        console.log(error)
    }
});
app.post("/nybruker", async (req, res) => {
    let nyUser = req.body;
    console.log("Ny kunde fra brukeren:", nyUser.epost);
    try {
        let query = "SELECT * FROM users;";
        let users = await database.query(query)
        const epost = req.body.epost
        let brukerFinnes = false
        for (let i=0; i<users.length; i++) {
            if (users[i].epost == epost) {
                console.log('epost finnes allerede')
                brukerFinnes = true
            }
        }
        if (!brukerFinnes) {
            console.log('epost er gyldig')
            try {
                let query = `INSERT INTO users (epost, password) VALUES ('${nyUser.epost}','${nyUser.password}')`;
                const dbResponse = await database.query(query);
                console.log(`Ny bruker lagt til i databasen: ${nyUser.epost} `)
            } catch (error) {
                console.log(error);
            };
        }
        res.json(brukerFinnes)
    } catch (error) {
        console.log(error)
    }
});

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});