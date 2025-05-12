require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const database = require('./dbconnector.js')
//require('./DBlager.js') //trengs bare når du lager fuglerliste
let jwt = require('jsonwebtoken');
app.use(express.json());
let cors = require("cors")
app.use(cors())

app.get("/observations", async (req, res) => {
    let query = "SELECT * FROM observations;"
    try {
        let observasjoner = await database.query(query)
        res.send(observasjoner)
    } catch (error) {
        console.log(error) 
    }
});

app.get("/birds", async (req, res) => {
    let query = "SELECT * FROM birds;"
    try {
        let birds = await database.query(query)
        res.send(birds)
    } catch (error) {
        console.log(error)
    }
})

app.post("/addobservation", async (req, res) => {
    let nyObservasjon = req.body;
    console.log("Ny observasjon fra brukeren:", nyObservasjon.brukernavn)
    try {
        let query = `INSERT INTO observations (username, species, date, place, description) VALUES ('${nyObservasjon.brukernavn}', '${nyObservasjon.art}', '${nyObservasjon.dato}', '${nyObservasjon.sted}', '${nyObservasjon.kommentar}')`
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
        const epost = req.body.email
        const passord = req.body.password
        let loggetInn = false
        for (let i=0; i<users.length; i++) {
            if (users[i].email == epost && users[i].password == passord) {
                console.log('logget inn')
                loggetInn = true
                var token = jwt.sign({userid: users[i].userID}, process.env.TOKEN_SECRET,{expiresIn: 120});
                //res.send(token)
                console.log(token)
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
app.post("/newuser", async (req, res) => {
    let nyUser = req.body;
    console.log("Ny kunde fra brukeren:", nyUser.username);
    try {
        let query = "SELECT * FROM users;";
        let users = await database.query(query)
        const epost = req.body.email
        let brukerFinnes = false
        for (let i=0; i<users.length; i++) {
            if (users[i].email == epost) {
                console.log('epost finnes allerede')
                brukerFinnes = true
            }
        }
        if (!brukerFinnes) {
            console.log('epost er gyldig')
            try {
                let query = `INSERT INTO users (username, email, password) VALUES ('${nyUser.username}','${nyUser.email}','${nyUser.password}');`;
                const dbResponse = await database.query(query);
                console.log(`Ny bruker lagt til i databasen: ${nyUser.username} `)
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