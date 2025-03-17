const API_URL = 'http://localhost:3000/'
// let cors = require("cors")
// app.use(cors())


async function getObservasjoner() {
  const res = await fetch(API_URL + "observasjoner");
  const data = await res.json();
  let box
  for (let i=0; i< data.length; i++){
    let art = data[i].species
    let bruker = data[i].username
    let dato = data[i].date
    let beskrivelse = data[i].description
    box += `<div class="observasjonboks"> <p>${bruker}</p> <h2>${art}</h2> <p>${dato}</p> <p>${beskrivelse}</p> </div>`
  }
  document.getElementById('output').innerHTML = box
  
}
getObservasjoner()

async function fetchCSV() {
  try {
      const response = await fetch('/fuglerliste.csv');
      const data = await response.text();
      const list = await data.split("\r\n")
      return list
  } catch (error) {
      console.error('Error fetching CSV:', error);
  }
};

fetchCSV().then((result) => {
  fuglerListe = result
  fuglerListe.sort((a, b) => a.length - b.length);
  for (let element = 0; element < fuglerListe.length; element++ ) {
    let listeelement = document.createElement('div')
    listeelement.innerHTML = `<li onclick="clickItem(${element})" role="presentation" class="link"> ${fuglerListe[element]} </li>`
    document.getElementById('autofill').appendChild(listeelement)
  }
}).catch(console.error);


function search() {
  var input, filter, li;
  input = document.getElementById('søk');
  filter = input.value.toUpperCase();
  ul = document.getElementById("autofill");
  li = ul.getElementsByTagName('li');

  for (let i = 0; i < fuglerListe.length; i++) {
    let a = fuglerListe[i];
    if (a.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none"; 
    }
  }
}

function synligListe() {
  document.getElementById('autofill').style.display = "inline"
}

function clickItem(index) {
  document.getElementById('søk').value = fuglerListe[index]
  search()
}

function bekreft() {
  document.getElementById('autofill').style.display = 'none'
}

function sendinn() {
  let art = document.getElementById("søk").value
  let sted = document.getElementById('sted').value
  let dato = document.getElementById('dato').value
  let kommentar = document.getElementById('kommentar').value

  let observasjonbundle = {
    "brukernavn": "tester",
    "art": art,
    "dato": dato,
    "sted": sted,
    "kommentar": kommentar
  }
  dato = dato.slice(0, 19).replace('T', ' ');
  fetch(API_URL + "addobservasjon", {
    method: "POST",
    body: JSON.stringify(observasjonbundle),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(function (response) {
    return response;
  })
  .then(function (data) {
    console.log(data);
    if (data) {
      var allInputs = document.querySelectorAll('input');
      allInputs.forEach(singleInput => singleInput.value = '');
    } 
    else {
      document.getElementById('søkBoks').innerHTML += '<p>en feil har oppstått, prøv igjen</p>'
    }
  })
  .catch((error) => console.error("Error:", error));
  getObservasjoner()
};