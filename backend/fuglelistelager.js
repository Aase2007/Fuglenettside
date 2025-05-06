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

async function createList(){ //lager table som lista skal inn i 
    try{
        let query = 'CREATE OR REPLACE TABLE birds (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, nameNO varchar(255), nameEN varchar(255), nameLA varchar(255));'
        const dbResponse = await database.query(query)
        console.log(dbResponse)
    } catch (error){
        console.log(error)
    }
}
createList()


async function insertList(){
    for(let i = 0; i < data.length; i++){
        let species = data[i]
        try {
            let query = `INSERT INTO birds (nameNO, nameEN, nameLA) VALUES ("${species.artNO}", "${species.artEN}", "${species.artLA}");`
            const dbResponse = await database.query(query)
        } catch(error) {
            console.log(error)
        }
    } 
}
insertList()
