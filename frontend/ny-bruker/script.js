const API_URL = 'http://localhost:3000/'
let cors = require("cors")
app.use(cors())

function submit() {
    let brukernavn = document.getElementById('brukernavn').value
    let brukerepost = document.getElementById('epost').value
    let brukerpassord1 = document.getElementById('passord1').value
    let brukerpassord2 = document.getElementById('passord2').value
    let epostfeil = document.getElementById('epostfeil')
    let passordfeil = document.getElementById('passordfeil')
    if (!brukerepost.includes('@')){
        epostfeil.style.display = "inline"
        epostfeil.innerHTML = 'Skriv inn en epostadresse '
    } else {
        if (brukerpassord1 != brukerpassord2) {
            passordfeil.style.display = "inline"
            passordfeil.innerHTML = 'Pass på at passordene er like '
        } else {
            let loginbundle = {
                'username': brukernavn,
                'email': brukerepost,
                'password': brukerpassord1
            }
            console.log(loginbundle)
            console.log(JSON.stringify(loginbundle))
            fetch(API_URL + "newuser", {
                method: "POST",
                body: JSON.stringify(loginbundle ),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            })
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                if (data) {
                    alert("Epostadressen har allerede en bruker :(");
                    window.location.href = "../logg-inn";
                } else {
                    alert("Bruker opprettet");
                    window.location.href = "../logg-inn"
                }
            })
            .catch((error)=> console.error("Error:", error));
        }
    }
}
function logginn() {
    window.location.href = "../logg-inn"
}