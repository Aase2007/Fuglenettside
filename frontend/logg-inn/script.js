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
        console.log(data.token)
        if (!data) {
            feilFelt.innerHTML = "Feil e-post eller passord, prøv igjen!"
            feilFelt.style.display = "block"
        } else {
            alert("Innlogging vellykket!");
            document.cookie = `token = ${data.token}; path=../frontend`;
            console.log(document.cookie)
            window.location.href = "../";
        }
    })
    .catch((error)=> console.error("Error:", error));
}
function nyBruker() {
    window.location.href = "../ny-bruker"
}