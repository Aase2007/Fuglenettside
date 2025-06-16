//denne siden setter excelarket fuglerliste inn i SQL
const reader = require('xlsx')
const database = require('./dbconnector.js')
require('dotenv').config();


// gjør om filen til en json
const file = reader.readFile('./fuglerliste.xlsx')
let data = []
const sheets = file.SheetNames
for(let i = 0; i < sheets.length; i++){
   const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]])
   temp.forEach((res) => {
      data.push(res)
   })
}

async function sendQuery(query){
    try{
        const dbResponse = await database.query(query)
        console.log(dbResponse)
    } catch(error){
        console.error
    }
}

let createBirds = "CREATE OR REPLACE TABLE birds ( nameNO varchar(255) PRIMARY KEY NOT NULL, nameEN varchar(255), nameLA varchar(255));"
sendQuery(createBirds)


// putter lista inn i databasen
async function insertList(){
    for(let i = 0; i < data.length; i++){
        let species = data[i]
        try{
            let query = `INSERT INTO birds (nameNO, nameEN, nameLA) VALUES ("${species.artNO}", "${species.artEN}", "${species.artLA}");`
            const dbResponse = await database.query(query)
        } catch(error){
            console.error
        }
    } 
}
insertList()

let createObservations = "CREATE OR REPLACE TABLE observations (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, username VARCHAR(255) NOT NULL, species VARCHAR(255) NOT NULL, place VARCHAR(255) NOT NULL, date DATETIME NOT NULL, description TEXT);"
sendQuery(createObservations)

let createUsers = "CREATE OR REPLACE TABLE users(username VARCHAR(255) NOT NULL PRIMARY KEY, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL);"
sendQuery(createUsers)

let createReference1 = "ALTER TABLE observations ADD FOREIGN KEY (species) REFERENCES birds(nameNO);"
sendQuery(createReference1)
let createReference2 = "ALTER TABLE observations ADD FOREIGN KEY (username) REFERENCES users(username);"
sendQuery(createReference2)

