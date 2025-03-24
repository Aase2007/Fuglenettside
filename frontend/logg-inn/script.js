const API_URL = 'http://localhost:3000/'
let cors = require("cors")
app.use(cors())

function submit() {
    let feilFelt = document.getElementById('feil')
    let brukerepost = document.getElementById('epost').value
    let brukerpassord = document.getElementById('passord').value
    let loginbundle = {
        'email': brukerepost,
        'password': brukerpassord
    }
    console.log(loginbundle)
    console.log(JSON.stringify(loginbundle))
    fetch(API_URL + "login", {
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
            alert("Innlogging vellykket!");
            document.cookie = "loggetinn=2";
            window.location.href = "../bruker-side";
        } else {
            feilFelt.innerHTML = "Feil e-post eller passord, prøv igjen!"
            feilFelt.style.display = "block"
        }
    })
    .catch((error)=> console.error("Error:", error));
}
function nyBruker() {
    window.location.href = "../ny-bruker"
}